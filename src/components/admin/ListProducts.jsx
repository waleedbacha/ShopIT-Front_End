import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import { useDeleteProductMutation, useGetAdminProductsQuery } from "../../redux/API/productsApi";
import AdminLayout from "../layout/adminLayout";


const ListProducts = () => {
  const { data, isLoading, error, refetch } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to fetch products");
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete product");
    }

    if (isSuccess) {
      toast.success("Product deleted successfully");
      refetch(); // Refetch product list to update UI
    }
  }, [error, deleteError, isSuccess, refetch]);

  const deleteProductHandler = (id) => {
    deleteProduct( id )
  };

  if (isLoading) return <Loader />;

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
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

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name?.substring(0, 20)}...`,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteProductHandler(product?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return products;
  };

  return (
    <AdminLayout>
      <MetaData title="All Products" />

      <div>
        <h1 className="my-5">{data?.products?.length || 0} Products</h1>

        <MDBDataTable
          data={setProducts()}
          className="px-3"
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
