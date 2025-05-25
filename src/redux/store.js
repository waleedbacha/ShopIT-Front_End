import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice";
import cartReducer from "./features/CartSlice";
import {productApi} from "./API/productsApi";
import { authApi } from "./API/authApi";
import { userApi } from "./API/userApi";
import { orderApi } from "./API/OrderApi";


export const store = configureStore({
reducer: {
auth: userReducer,
cart: cartReducer,

[productApi.reducerPath]: productApi.reducer,
[authApi.reducerPath]: authApi.reducer,    
[userApi.reducerPath]: userApi.reducer,
[orderApi.reducerPath]: orderApi.reducer,


},
middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([productApi.middleware,
         authApi.middleware,
          userApi.middleware,
           orderApi.middleware,
        ]),
});