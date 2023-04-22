import { getUrl, getNetflixUrl, getAppleUrl, getDisneyUrl, getPrimeUrl, getHuluUrl, getHBOUrl, getCrunchyUrl } from "./tmdb.config.js";

const providerUrls = {
  "all": getUrl,
  "prime-video": getPrimeUrl,
  "apple-tv": getAppleUrl,
  "crunchy-roll": getCrunchyUrl,
  "disney-plus": getDisneyUrl,
  "hbo-max": getHBOUrl,
  "hulu": getHuluUrl,
  "netflix": getNetflixUrl,
}

const mediaTypes = ["tv shows", "movies"]

const tmdbEndpoints = {
  mediaList: ({ provider, genre, type, category, page }) => {
    if (provider !== "all") {
      let getMediaUrl = providerUrls[provider]

      return getMediaUrl(
        // `providers/${provider}/media-types/${type}/${category}`, { page }
        `${type}/${category}`, { page }
        // `movie/${category}`, { page }
        )
    } 
  },
  mediaListForAllProviders: ({ mediaProvider, mediaType, mediaCategory, page }) => {
    console.log("made it!");
    let response;
    
    // providerUrls[mediaProvider]
    providerUrls.map((providerUrl) => {
      mediaTypes.map((type) => {
        response += eval(`
          ${providerUrl}("providers/${mediaProvider}/media-types/${type}/${mediaCategory}", { page })
        `)
      })
    })
  },
  mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}`
  ),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
    `genre/${mediaType}/list`
  ),
  mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/credits`
  ),
  mediaVideos: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/videos`
  ),
  mediaRecommend: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/recommendations`
  ),
  mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/images`
  ),
  mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
    `search/${mediaType}`, { query, page }
  ),
  personDetail: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}`
  ),
  personMedias: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}/combined_credits`
  ),
};

export default tmdbEndpoints;