import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
reducerPath: "productApi",
baseQuery: fetchBaseQuery({baseUrl: "/api/v1"}),
tagTypes: ["product" , "AdminProducts", "Reviews"],
endpoints: (builder) => ({
getProducts:builder.query({
    query: (params) => ({
    url: "/products",
    params:{
    page:params?.page,
    keyword:params?.keyword,
    categories: params.categories,
    "price[gte]": params.min,
    "price[lte]": params.max,
    "ratings[gte]":params.ratings,
    
    }
}),
}),
getProductDetails:builder.query({
    query: (id) => `/products/${id}`,
    providesTags: ["product"],
}),

submitReview:builder.mutation({
    query(body) {
        return {
            url: "/reviews",
            method: "PUT",
            body,
        }
    },
    invalidatesTags: ["product"],
}),
/*canUserReview:builder.query({
    query: (productId) => `/can_review/?productId=${productId}`,
    
}), */

getAdminProducts:builder.query({
    query: () => `/admin/products`,
    providesTags: ["AdminProducts"],
}),

createProduct:builder.mutation({
    query(body) {
        return {
            url: "/admin/products",
            method: "POST",
            body,
        }
    },
    invalidatesTags: ["AdminProducts"]
}),

updateProduct:builder.mutation({
    query({id, body}) {
        return {
            url: `/admin/products/${id}`,
            method: "PUT",
            body,
        }
    },
    invalidatesTags: ["AdminProducts", "product"]
}),

uploadProductImages:builder.mutation({
    query({id, body}) {
        return {
            url: `/admin/products/${id}/upload_images`,
            method: "PUT",
            body,
        }
    },
    invalidatesTags: ["product"]
}),

deleteProductImage:builder.mutation({
    query({id, body}) {
        return {
            url: `/admin/products/${id}/delete_image`,
            method: "PUT",
            body,
        }
    },
    invalidatesTags: ["product"]
}),

deleteProduct:builder.mutation({
    query(id) {
        return {
            url: `/admin/products/${id}`,
            method: "DELETE",
            
        }
    },
    invalidatesTags: ["AdminProducts"],
}),

getProductReviews:builder.query({
    query: (productId) =>   `/reviews?id=${productId}`,
    invalidatesTags:["Reviews"],
    
}),

deleteReview:builder.mutation({
    query({productId, id}) {
        return {
            url: `/admin/reviews?prductId=${productId}&id=${id}`,
            method: "DELETE",
            
        }
    },
    invalidatesTags: ["Reviews"],
}),

}),
});

export const {
     useGetProductsQuery,
     useGetProductDetailsQuery, 
     useSubmitReviewMutation, 
      
     useGetAdminProductsQuery,
     useCreateProductMutation,
     useUpdateProductMutation,
     useUploadProductImagesMutation,
     useDeleteProductImageMutation,
     useDeleteProductMutation,
     useLazyGetProductReviewsQuery,
     useDeleteReviewMutation
    
     
    } = productApi;