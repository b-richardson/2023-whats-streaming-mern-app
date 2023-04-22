const mediaProvider = {
  amazonPrime: "amazon-prime",
  appleTv: "apple-tv",
  crunchyRoll: "crunchy-roll",
  disneyPlus: "disney-plus",
  hboMax: "hbo-max",
  hulu: "hulu",
  netflix: "netflix"
}

const mediaType = {
  movie: "movie",
  tv: "tv"
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated"
};

// const watchProvider = {
//   netflix: "Netflix",
//   disneyPlus: "Disney Plus"
// };

const backdropPath = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  mediaProvider,
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath
};

export default tmdbConfigs;