import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { useMyOrderQuery } from "../../redux/API/OrderApi";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/metaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/CartSlice";


const MyOrders = () => {
  const { data, isLoading, error } = useMyOrderQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const orderSuccess = searchParams.get("order_success");

  // Show toast notification for errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch orders");
    }
    if(orderSuccess){
        dispatch(clearCart());
        navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  if (isLoading) return <Loader />;

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "status",
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

    // Populate rows with orders data
    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `$${order?.totalAmount.toFixed(2)}`, // Format amount
        status: order?.paymentInfo?.status?.toUpperCase() || "UNKNOWN",
        orderStatus: order?.orderStatus || "N/A",
        actions: (
          <>
            {/* Correct template literals */}
            <Link to={`/me/orders/${order?._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/invoice/orders/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      });
    });

    return orders;
  };

  return (
    <>
    <MetaData title= "My Orders"/>

    <div>
      <h1 className="my-5">{data?.orders?.length || 0} Orders</h1>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
    </>
  );
};

export default MyOrders;
