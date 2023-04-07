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
    path: "/",
    state: "favorite"
  },
  {
    display: "disney+",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "reviews"
  },
  {
    display: "hbo max",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "password.update"
  },
  {
    display: "prime video",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "password.update"
  },
  {
    display: "apple tv+",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "password.update"
  },
  {
    display: "hulu",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "password.update"
  },
  {
    display: "crunchyroll",
    icon: <SlideshowOutlinedIcon />,
    path: "/",
    state: "password.update"
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