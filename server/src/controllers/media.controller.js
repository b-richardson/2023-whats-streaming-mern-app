import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";
// import { filterMedia } from "../media/media-filtering.js";
import { getFilteredMedia } from "../media/media-retrieval.js";

const getList = async (req, res) => {
  // console.log("inside media.controller: ", Object.keys(res.status(200).json()))
  try {
    const { page } = req.query;
    // NOTE: mediaType can be movie or tv show, mediaCategory can be popular or top
    // rated, mediaProvider can be streaming services like Netflix.
    // const { mediaProvider, mediaCategory, mediaType } = req.params;
    const { mediaProvider, mediaType, mediaCategory } = req.params;
    console.log("media.controller params: ", mediaProvider, mediaType);

    // const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
    const response = await getFilteredMedia({ provider: mediaProvider, type: mediaType, category: mediaCategory, page })

    return responseHandler.ok(res, response);
  } catch {
    console.log("media.controller getList error: ")
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    console.log(mediaType);

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };