import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";

const BackdropSlide = ({ backdrops }) => (
  <NavigationSwiper>
    {[...backdrops].splice(0, 10).map((backdrop, index) => (
      <SwiperSlide key={index}>
        <Box sx={{
          paddingTop: "60%",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundImage: `url(${tmdbConfigs.backdropPath(backdrop.file_path)})`
        }} />
      </SwiperSlide>
    ))}
  </NavigationSwiper>
);

export default BackdropSlide;