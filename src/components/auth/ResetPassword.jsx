import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/API/userApi";
import MetaData from "../layout/metaData"

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated){
        navigate("/");
        }
       if(error) {   
       toast.error(error?.data?.message);
      }
      
      if(isSuccess) {
          toast.success("Password Reset Successfully");
          navigate("/login");
      }
      
      }, [error, isAuthenticated, isSuccess]
      );
      
      const submitHandler = (e) =>{
      e.preventDefault();
      
      if(password !== confirmPassword){
        return toast.error("Password does not matched, Try again!");
      }
      
      const data = {password, confirmPassword}

      resetPassword({token: params?.token, body: data});
    };
    return (
      <>
        <MetaData title = {"Reset Password"} />
        <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 class="mb-4">New Password</h2>

          <div class="mb-3">
            <label for="password_field" class="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="confirm_password_field" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm_password_field"
              class="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" class="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Updating.." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
    </>

    )
};

export default ResetPassword;