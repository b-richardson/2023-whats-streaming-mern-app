import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaList: async ({ provider, genre, type, category, page }) => {
    const response = await axiosClient.get(
      tmdbEndpoints.mediaList({ provider, genre, type, category, page })
    )

    return response
  },
  mediaListForAllProviders: async ({ mediaCategory, page }) => {
    const response = await axiosClient.get(
      tmdbEndpoints.mediaListForAllProviders({ mediaCategory, page })
    )
    console.log(response)

    return response
  },
  mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaDetail({ mediaType, mediaId })
  ),
  mediaGenres: async ({ mediaType }) => await axiosClient.get(
    tmdbEndpoints.mediaGenres({ mediaType })
  ),
  mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaCredits({ mediaType, mediaId })
  ),
  mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaVideos({ mediaType, mediaId })
  ),
  mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaImages({ mediaType, mediaId })
  ),
  mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
  ),
  mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
    tmdbEndpoints.mediaSearch({ mediaType, query, page })
  ),
  personDetail: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personDetail({ personId })
  ),
  personMedias: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personMedias({ personId })
  )
};

export default tmdbApi;