import { configureStore } from "@reduxjs/toolkit";

import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    themeMode: themeModeSlice,
    user: userSlice
  }
});

export default store;