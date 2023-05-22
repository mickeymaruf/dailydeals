import { configureStore } from '@reduxjs/toolkit'
import apis from '../features/apis/apis';
import authSlice from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        [apis.reducerPath]: apis.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apis.middleware),
})

export default store;