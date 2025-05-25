import React from "react";
import {Route} from "react-router-dom";

import Home from "../home";
import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../User/Profile";
import UpdatePrifile from "../User/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../User/UploadAvatar";
import UpdatePassword from "../User/UpdatePassword";
import ForgotPassword from "../auth/ForgetPassword";
import ResetPassword from "../auth/ResetPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import MyOrders from "../order/MyOrders";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/Invoice";






const userRoutes = () => {



return(
<>
<Route path="/" element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/password/forgot" element={<ForgotPassword/>} />
      <Route path="/password/reset/:tokem" element={<ResetPassword/>} />




      <Route path="/me/profile" element={
        <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
      } />

      <Route path="/me/update_profile" element={
      <ProtectedRoute>
      <UpdatePrifile/>
      </ProtectedRoute>
    } />

        <Route path="/me/upload_avatar" element={
        <ProtectedRoute>
        <UploadAvatar/>
        </ProtectedRoute>
      } />

        <Route path="/me/update_password" element={
        <ProtectedRoute>
        <UpdatePassword/>
        </ProtectedRoute>
      } />

   
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shipping" element={  <ProtectedRoute> <Shipping/> </ProtectedRoute> } />

        <Route path="/confirm_order" element={  <ProtectedRoute> <ConfirmOrder/> </ProtectedRoute> } />

        <Route path="/payment_method" element={  <ProtectedRoute> <PaymentMethod/> </ProtectedRoute> } />

        <Route path="/me/orders" element={
        <ProtectedRoute>
        <MyOrders/>
        </ProtectedRoute>
      } />

        <Route path="/me/orders/:id" element={
        <ProtectedRoute>
        <OrderDetails/>
        </ProtectedRoute>
      } />

      <Route path="/invoice/orders/:id" element={
        <ProtectedRoute>
        <Invoice/>
        </ProtectedRoute>
      } />



</>
    
)
};

export default userRoutes;