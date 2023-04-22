import { client } from "../redis/redis.client.js"
// import { getMediaIdsForNamespace, constructNamespace } from "./media-filtering";
import { getFilteredMedia } from "./media-retrieval.js";

const cacheMediaIds = async () => {
  try {
    // Get all media IDs from Redis
    const allMediaIds = await getFilteredMedia.getMediaIdsForNamespace(getFilteredMedia.constructNamespace(ALL_NAMESPACE));
    // Cache the IDs for 24 hours
    await client.sAdd('media:all', JSON.stringify(allMediaIds), 'EX', CACHE_EXPIRATION_TIME);
  } catch (error) {
    console.error(`Error caching media IDs: ${error}`);
  }
};

const cacheMediaObject = async (media) => {
  // console.log("cacheMediaObject(): ", media)
  // Object.entries(media).forEach(([key, value]) => {
  //   client.hSet(`media:${media.id}`, key, value, (err, res) => {
  //     console.log(res);
  //     if (err) throw err;
  //   });
  // });
  await client.set(`media:${media.id}`, JSON.stringify(media));
}

export {
  cacheMediaIds,
  cacheMediaObject,
}