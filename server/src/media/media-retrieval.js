import db from "../cache/data-cache.js";
import tmdbApi from "../tmdb/tmdb.api.js"
import { client } from "../redis/redis.client.js";
import { cacheMediaObject } from "./media-caching.js";

const getFilteredMedia = async ({ provider = "all", genre = "all", type = "all", category, page }) => {
  const ALL_NAMESPACE = ':all';
  const CACHE_EXPIRATION_TIME = 24 * 60 * 60; // 24 hours in seconds
  const GENRE_NAMESPACE = ':genres';
  const MEDIA_NAMESPACE = 'media';
  const PROVIDER_NAMESPACE = ':providers';
  const TYPE_NAMESPACE = ':types';
  let response = {results: []};

  console.log("getFilteredMedia()", provider, genre, type, category, page)
  // Helper function to construct Redis namespaces based on filter parameters
  // TODO: Convert to TypeScript so we can use an enum for the filter options.
  // Will resolve edge case where filtersMap size is 1-3 but with an unknown
  // filter.
  const constructNamespace = (filtersMap) => {
    // console.log("constructNamespace()")
    let constructedNamespace;

    switch(filtersMap.size) {
      case 1:
        const [key, value] = filtersMap.entries().next().value;
        if (key === "provider") {
          constructedNamespace = `${MEDIA_NAMESPACE}${PROVIDER_NAMESPACE}:${value}`
        } else if (key === "genre") {
          constructedNamespace = `${MEDIA_NAMESPACE}${GENRE_NAMESPACE}:${value}`
        } else if (key === "type") {
          constructedNamespace = `${MEDIA_NAMESPACE}${TYPE_NAMESPACE}:${value}`
        }
        break;
      case 2:
        const [firstKey, firstValue] = filtersMap.entries().next().value;
        const [secondKey, secondValue] = [...filtersMap.entries()].pop();
        if (firstKey === "provider" && secondKey === "genre") {
          constructedNamespace = `${MEDIA_NAMESPACE}${PROVIDER_NAMESPACE}:${firstValue}${GENRE_NAMESPACE}:${secondValue}`
        } else if (firstKey === "provider" && secondKey === "type") {
          constructedNamespace = `${MEDIA_NAMESPACE}${PROVIDER_NAMESPACE}:${firstValue}${TYPE_NAMESPACE}:${secondValue}`
        } else if (firstKey === "genre" && secondKey === "type") {
          constructedNamespace = `${MEDIA_NAMESPACE}${GENRE_NAMESPACE}:${firstValue} ${TYPE_NAMESPACE}:${secondValue}`
        }
        break;
      case 3:
        if (filtersMap.has("provider") && filtersMap.has("genre") && filtersMap.has("type")) {
          constructedNamespace = `${MEDIA_NAMESPACE}${PROVIDER_NAMESPACE}:${filtersMap.get("provider")}${TYPE_NAMESPACE}:${filtersMap.get("genre")} ${filtersMap.get("type")}`
        }
        break;
      default:
        // If no filters are provider or more than the 3 available, return the
        // namespace for all media
        constructedNamespace = `${MEDIA_NAMESPACE}${ALL_NAMESPACE}`;
        break;
    }

    return constructedNamespace
  }

  const filterMedia = async () => {
    // console.log("filterMedia()")
    let cachedSetNamespace;

    try {
      // Get the media IDs for the relevant namespaces based on the filter parameters
      const providerIds = await getMediaIdsForNamespace(constructNamespace(new Map([["provider", provider]])));
      const genreIds = await getMediaIdsForNamespace(constructNamespace(new Map([["genre", genre]])));
      const typeIds = await getMediaIdsForNamespace(constructNamespace(new Map([["type", type]])));

      // Takes the intersection of the sets to get the relevant media IDs
      let relevantIds;
      switch (true) {
        case [provider, genre, type].every((filter) => filter === "all"):
          // If no filter parameters are provided, return all media IDs
          cachedSetNamespace = constructNamespace(new Map());
          relevantIds = await getMediaIdsForNamespace(cachedSetNamespace);
          break;
        case [genre, type].every((filter) => filter === "all"):
          cachedSetNamespace = constructNamespace(new Map([["provider", provider]]));
          relevantIds = providerIds;
          break;
        case [provider, type].every((filter) => filter === "all"):
          cachedSetNamespace = constructNamespace(new Map([["genre", genre]]));
          relevantIds = genreIds;
          break;
        case [provider, genre].every((filter) => filter === "all"):
          cachedSetNamespace = constructNamespace(new Map([["type", type]]));
          relevantIds = typeIds;
          break;
        case provider === "all":
          cachedSetNamespace = constructNamespace(new Map([["genre", genre], ["type", type]]));
          relevantIds = genreIds.filter((id) => typeIds.includes(id));
          break;
        case genre === "all":
          cachedSetNamespace = constructNamespace(new Map([["provider", provider], ["type", type]]));
          relevantIds = providerIds.filter((id) => typeIds.includes(id));
          break;
        case type === "all":
          cachedSetNamespace = constructNamespace(new Map([["provider", provider], ["genre", genre]]));
          relevantIds = providerIds.filter((id) => genreIds.includes(id));
          break;
        default:
          cachedSetNamespace = constructNamespace(new Map([["provider", provider], ["genre", genre], ["type", type]]));
          relevantIds = providerIds.filter((id) => genreIds.includes(id)).filter((id) => typeIds.includes(id));
          break;
      }

      // Check if the ids for this filter combination are fresh
      const warmIds = await validateOrRewarmIds(cachedSetNamespace, relevantIds)

      const mediaList = await getAllMediaObjects(warmIds);

      return {
        results: mediaList
      }
    } catch (error) {
    // TODO: add code to only enable in development environment
      console.error(`Error connecting to Redis database: ${error}`);
      throw error;
      // return [];
    }
  }

  const getAllMediaFromApi = async () => {
    // console.log("getAllMediaFromApi()")
    if (type === "all") {
      // console.log("type was all")
      const movieResponse = await tmdbApi.mediaList({ provider, genre, type: "movie", category, page });
      const tvResponse = await tmdbApi.mediaList({ provider, genre, type: "tv", category, page });

      response.results.push(...movieResponse.results, ...tvResponse.results)
      response.total_pages = movieResponse.total_pages + tvResponse.total_pages
      response.total_results = movieResponse.total_results + tvResponse.total_results
    } else {
      // console.log("type was not all")
      response.push(await tmdbApi.mediaList({ provider, genre, type, category, page }));
    }

    // console.log("getAllMediaFromApi() response", response)

    if (response.results) {
      return response
    } else {
      throw new Error("Error fetching media from TMDB")
    }
  }

  const getAllMediaObjects = async (ids) => {
    // console.log("getAllMediaObjects(): ", ids)
    let media=[]
    await Promise.all(ids.map(async (id) => media.push(await getMediaObjectById(id))));
    console.log("getAllMediaObjects media: ", media);
    return media
  }

  // const getMediaFromAllProviders = async () => {
  //   console.log("getMediaFromAllProviders()")
  //   response.push(await tmdbApi.mediaListForAllProviders({ category, page }));
  //   // TODO: fetch from all APIs
  //   if (response.results) {
  //     console.log("Nothing was cached, API response: ", response)
  //     // TODO: format response to return only array of media ids
  //     return response
  //   } else {
  //     throw new Error("Error fetching media from TMDB")
  //   }
  // }

  const getMediaIdsForNamespace = async (namespace) => {
    let ids;
    console.log("getMediaIdsForNamespace(): ", namespace);
    // Get the IDs from the Redis set for the given namespace
    ids = await client.sMembers(namespace);

    if (ids === undefined) {
      const data = await getAllMediaFromApi()
      ids = data.results.map(media => media.id)
    }
    return ids;
  }

  const getMediaObjectById = async (id) => {
    // console.log("getMediaObjectById(): ", id);
    const inMemoryValue = await getMediaObjectFromInMemoryDB(id);
    const cachedValue = await getMediaObjectFromCache(id);
    const apiValue = getMediaObjectFromApi(id);
    let media;

    if (inMemoryValue) {
      media = inMemoryValue;
    } else if (cachedValue) {
      media = cachedValue
      db[id] = cachedValue
    } else {
      media = apiValue;
      db[id] = apiValue;
      // console.log("apiValue: ", apiValue)
      cacheMediaObject(apiValue)
    }

    return media;
  }

  const getMediaObjectFromApi = (id) => {
    // console.log("getMediaObjectFromApi()")
    const media = response.results.find(result => result.id === id)

    return media
  }

  const getMediaObjectFromCache = async (id) => {
    // console.log("getMediaObjectFromCache(): ", `${MEDIA_NAMESPACE}:${id}`);
    // const media = await client.hGetAll(`${MEDIA_NAMESPACE}:${id}`)
    const media = await client.get(`${MEDIA_NAMESPACE}:${id}`)

    if (media) {
      return JSON.parse(media);
    }
  }
  
  const getMediaObjectFromInMemoryDB = async (id) => {
    // console.log("getMediaObjectFromInMemoryDB(): ", await db[id]);
    return await db[id] | false;
  }

  const rewarmCachedMediaIds = async (cachedSetNamespace, ids) => {
    // console.log("rewarmCachedMediaIds(): ", cachedSetNamespace, ids)
    client.sAdd(cachedSetNamespace, ids, 'EX', CACHE_EXPIRATION_TIME);

    return await client.sMembers(cachedSetNamespace)
  }

  const validateOrRewarmIds = async (cachedSetNamespace, cachedIds) => {
    // console.log("validateOrRewarmIds(): ", cachedSetNamespace, cachedIds)
    const cachedSetAge = (Date.now() - await client.ttl(cachedSetNamespace) * 1000) / (60 * 60 * 1000) | 0;

    // If there is at least one id passed in and the cache is less than 12 hours old, parse
    // and return them.
    if (cachedIds.length > 0 && cachedSetAge < 12) {
      // console.log("there are fresh cached media ids: ", cachedIds)
      return cachedIds;
    } else {
      // console.log("no fresh cached media ids!")
      // Get all media IDs from the relevant sets
      return rewarmCachedMediaIds(cachedSetNamespace, cachedIds);
    }
  }

  return await filterMedia();
}

export {
  // constructNamespace,
  getFilteredMedia,
  // getMediaIdsForNamespace,
};