import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/API/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../layout/userLayout";
import MetaData from "../layout/metaData"



const UpdatePrifile = () => {

    const [name, setName] = useState("");
    
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

   const [updateProfile, {isLoading, error, isSuccess} ] =  useUpdateProfileMutation();

   const {user} = useSelector((state) => state.auth);

   useEffect(() => { 
    if(user) {
        setName(name?.user);
        setEmail(email?.user);
    }
    if(error) {   
        toast.error(error?.data?.message);
    }
    if(isSuccess) {   
        toast.success("User Updated");
        navigate("/me/profile");
    }

   }, [user, error, isSuccess]);

   const submitHandler = (e) =>{
    e.preventDefault();

    const userData = {
     name,
     email,   
    };
    updateProfile(userData);
   };

return (
  <>
        <MetaData title = {"Update Profile"} />
<UserLayout> 

<div> <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
          {!isLoading? "Updating..." : "Update" }
          </button>
        </form>
      </div>
    </div></div>
    </UserLayout>   
    </>

)
    
}
export default UpdatePrifile;