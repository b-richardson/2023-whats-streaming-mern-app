import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    icon: <HomeOutlinedIcon />,
    path: "/",
    state: "home"
  },
  {
    display: "movies",
    icon: <SlideshowOutlinedIcon />,
    path: "/movie",
    state: "movie"
  },
  {
    display: "tv series",
    icon: <LiveTvOutlinedIcon />,
    path: "/tv",
    state: "tv"
  },
  {
    display: "search",
    icon: <SearchOutlinedIcon />,
    path: "/search",
    state: "search"
  }
];

const provider = [
  {
    display: "netflix",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/netflix/media-types/all",
    state: "favorite"
  },
  {
    display: "disney+",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/disney-plus/media-types/all",
    state: "favorite"
  },
  {
    display: "hbo max",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/hbo-max/media-types/all",
    state: "favorite"
  },
  {
    display: "prime video",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/prime-video/media-types/all",
    state: "favorite"
  },
  {
    display: "apple tv+",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/apple-tv/media-types/all",
    state: "favorite"
  },
  {
    display: "hulu",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/hulu/media-types/all",
    state: "favorite"
  },
  {
    display: "crunchyroll",
    icon: <SlideshowOutlinedIcon />,
    path: "/providers/crunchy-roll/media-types/all",
    state: "favorite"
  },
];

const user = [
  {
    display: "favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    path: "/favorites",
    state: "favorite"
  },
  {
    display: "reviews",
    icon: <RateReviewOutlinedIcon />,
    path: "/reviews",
    state: "reviews"
  },
  {
    display: "password update",
    icon: <LockResetOutlinedIcon />,
    path: "/password-update",
    state: "password.update"
  }
];

const menuConfigs = { main, provider, user };

export default menuConfigs;