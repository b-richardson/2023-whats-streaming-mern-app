import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import mediaApi from "../api/modules/media.api";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import usePrevious from "../hooks/usePrevious";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const MediaList = () => {
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const dispatch = useDispatch();
  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const { mediaType } = useParams();
  const prevMediaType = usePrevious(mediaType);

  const categories = ["popular", "top rated"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);
      console.log('Getting Media')

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }

    getMedias();
  }, [
    currCategory,
    currPage,
    dispatch,
    mediaCategories,
    mediaType,
    prevMediaType
  ]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {categories.map((category, index) => (
              <Button
                key={index}
                onClick={() => onCategoryChange(index)}
                size="large"
                sx={{
                  color: currCategory === index ? "primary.contrastText" : "text.primary"
                }}
                variant={currCategory === index ? "contained" : "text"}
              >
                {category}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
        <LoadingButton
          color="primary"
          fullWidth
          loading={mediaLoading}
          onClick={onLoadMore}
          sx={{ marginTop: 8 }}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;