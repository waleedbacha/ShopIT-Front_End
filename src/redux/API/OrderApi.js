import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
reducerPath: "orderApi",
baseQuery: fetchBaseQuery({baseUrl: "/api/v1"}),
tagTypes: ["order", "AdminOrders"],
endpoints: (builder) => ({
createNewOrder:builder.mutation({
    query(body) {
        return {
            url: "/orders/new",
            method: "POST",
            body,
        };
    },
}),

// My Orders //
myOrder:builder.query({
    query: () => `/me/orders`,
       
}),

// Order Details //
orderDetails:builder.query({
    query: (id) => `/orders/${id}`,
    providesTags: ["order"],
       
}),

stripeCheckoutSession:builder.mutation({
    query(body) {
        return {
            url: "/payment/checkout_session",
            method: "POST",
            body,
        }
    }
}),

// My All Orders //
getAdminOrders:builder.query({
    query: () => `/admin/orders`,
    providesTags: ["AdminOrders"]
       
}),

updateOrder:builder.mutation({
    query({ id, body }) {
        return {
            url: `/admin/orders/${id}`,
            method: "PUT",
            body,
        };
    },
    invalidatesTags: ["order"],
}),

deleteOrder:builder.mutation({
    query(id) {
        return {
            url: `/admin/orders/${id}`,
            method: "DELETE",
        };
    },
    invalidatesTags: ["AdminOrders"],
})

}),
});

export const {
    useCreateNewOrderMutation,
     useStripeCheckoutSessionMutation,
      useMyOrderQuery,
       useOrderDetailsQuery,
        useGetAdminOrdersQuery,
        useUpdateOrderMutation,
        useDeleteOrderMutation
    } = orderApi;