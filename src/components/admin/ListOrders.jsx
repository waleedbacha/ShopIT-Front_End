import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import AdminLayout from "../layout/adminLayout";
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from "../../redux/API/OrderApi";

const ListOrders = () => {
  // Fetch orders using a custom hook
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const  [deleteOrder, {isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteOrderMutation();

  useEffect(() => {
    // Display an error message if fetching orders fails
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch orders");
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete order");
     }

    if (isSuccess) {
     toast.success("Order deleted successfully");
    //   refetch(); // Refetch orders to update the UI
     }
  }, [error,deleteError, isSuccess]);

   const deleteOrderHandler = (id) => {
     deleteOrder(id);
   };

  // Show a loader while orders are being fetched
  if (isLoading) return <Loader />;

  // Format the data for the orders table
  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
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

    // Populate rows with order data
    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            {/* Edit Order Button */}
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
               onClick={() => deleteOrderHandler(order?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return orders;
  };

  return (
    <AdminLayout>
      <MetaData title="All Orders" />

      <div>
        {/* Display total number of orders */}
        <h1 className="my-5">{data?.orders?.length || 0} Orders</h1>

        {/* Render the orders table */}
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
};

export default ListOrders;
