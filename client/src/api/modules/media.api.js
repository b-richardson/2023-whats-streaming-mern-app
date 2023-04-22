import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  // list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  // list: ({ mediaProvider, mediaType, mediaCategory, page }) => `providers/${mediaProvider}/media-types/${mediaType}/${mediaCategory}?page=${page}`,
  list: ({ mediaProvider, mediaType, mediaCategory, page }) => `providers/${mediaProvider}/media-types/${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`
};

const mediaApi = {
  // getList: async ({ mediaProvider, mediaType, mediaCategory, page }) => {
  getList: async ({ mediaProvider, mediaType, mediaCategory, page }) => {
    console.log("media.api params: ", { mediaProvider, mediaType, mediaCategory, page })
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaProvider, mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) { 
      console.log("There was an error in the media.api getList method: ", err)
      return { err }; 
    }
  },
  getDetail: async ({ mediaProvider, mediaType, mediaId }) => {
    console.log({ mediaProvider, mediaType, mediaId })
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  search: async ({ mediaProvider, mediaType, query, page }) => {
    console.log({ mediaProvider, mediaType, page })
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) { return { err }; }
  }
};

export default mediaApi;