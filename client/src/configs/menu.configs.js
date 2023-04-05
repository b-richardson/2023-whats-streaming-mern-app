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
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv"
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  }
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];

const provider = [
  {
    display: "netflix",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "disney+",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "hbo max",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "password.update"
  },
  {
    display: "prime video",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "password.update"
  },
  {
    display: "apple tv+",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "password.update"
  },
  {
    display: "hulu",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "password.update"
  },
  {
    display: "crunchyroll",
    path: "/",
    icon: <SlideshowOutlinedIcon />,
    state: "password.update"
  },
];

const menuConfigs = { main, user, provider };

export default menuConfigs;