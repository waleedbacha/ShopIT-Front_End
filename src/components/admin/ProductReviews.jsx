import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/adminLayout";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/metaData";
import { useDeleteReviewMutation, useLazyGetProductReviewsQuery } from "../../redux/API/productsApi";

const ProductReview = () => {

const [productId, setproductId] = useState("");     

const [getProductReviews, {data, isLoading, error}] = useLazyGetProductReviewsQuery();

const [deleteReview , {isLoading: isDeleteLoading, error: deleteError, isSuccess}] = useDeleteReviewMutation();

useEffect(() => {
    if (error) {
   toast.error(error?.data?.message || "Failed to fetch reviews");
   }

    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete review");
    }

   if (isSuccess) {
     toast.success("Review deleted successfully");
       
     }
  }, [error, deleteError, isSuccess]);

const submitHandler = (e) => {
e.preventDefault();
getProductReviews(productId);
};

const deleteReviewHandler = (id) => {
    deleteReview({productId, id})
    }
const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Review Id",
          field: "reviewId",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
            label: "User",
            field: "user",
            sort: "asc",
          },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.reviews?.forEach((review) => {
        reviews.rows.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: (
          <>
            <button
              className="btn btn-outline-danger ms-2"
               onClick={() => deleteReviewHandler(review?._id)}
               disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return reviews;
  };

  if (isLoading) return <Loader />;


return(
 <AdminLayout>
    <MetaData title="Product Reviews" />
  <div className="row justify-content-center my-5">
      <div className="col-6">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="productId_field" className="form-label">
              Enter Product ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={productId}
              onChange={(e) => setproductId(e.target.value)}
            />
          </div>

          <button
            id="search_button"
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>

    {data?.reviews?.length > 0 ? (
  <>
    <h5 className="mt-3 text-center">
      Product name: <b></b>
    </h5>
    <MDBDataTable
      data={setReviews()}
      className="px-3"
      bordered
      striped
      hover
    />
  </>
) : (
  <p className="mt-5 text-center">No Reviews</p>
)}

 </AdminLayout>   
);

};

export default ProductReview;