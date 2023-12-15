import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import timesReducer from "./features/times/timesSlice";
import availableTimesReducer from "./features/AvilableTimes/AvailableTimesSlice.js";
import articles from "./features/articles/articlesSlice.js";
import { articleApi } from "./features/articles/articlesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { timesApi } from "./features/times/timesApi";
import { specialitiesApi } from "./features/Specialities/specialitiesApi";
import { videosApi } from "./features/videos/videos";
import { usersApi } from "./features/users/users";
import { bouquetApi } from "./features/bouquet/bouquet";
import { videoTypesApi } from "./features/videoTypes/videoTypes";
import { filesApi } from "./features/files/filesApi.js";
import { reportsApi } from "./features/reports/reportsApi.js";
import { patientApi } from "./features/Patient/Patient.js";
import { staffUserApi } from "./features/staffUser/staffUser.js";
import { votesApi } from "./features/votes/votes.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    times: timesReducer,
    availableTimes: availableTimesReducer,
    // articles: articles,
    [articleApi.reducerPath]: articleApi.reducer,
    [timesApi.reducerPath]: timesApi.reducer,
    [specialitiesApi.reducerPath]: specialitiesApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [bouquetApi.reducerPath]: bouquetApi.reducer,
    [videoTypesApi.reducerPath]: videoTypesApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [staffUserApi.reducerPath]: staffUserApi.reducer,
    [votesApi.reducerPath]: votesApi.reducer,
  },
  middleware: (getDeafultMiddleware) => {
    return getDeafultMiddleware().concat(
      articleApi.middleware,
      timesApi.middleware,
      specialitiesApi.middleware,
      videosApi.middleware,
      usersApi.middleware,
      bouquetApi.middleware,
      videoTypesApi.middleware,
      filesApi.middleware,
      reportsApi.middleware,
      patientApi.middleware,
      staffUserApi.middleware,
      votesApi.middleware
    );
  },
});
setupListeners(store.dispatch);
