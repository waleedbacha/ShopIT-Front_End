import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import AdminLayout from "../layout/adminLayout";
import { useDeleteUserMutation, useGetAdminUsersQuery} from "../../redux/API/userApi";

  const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  const [deleteUser, {isLoading: isDeleteLoading, error:deleteError, isSuccess}] =  useDeleteUserMutation();


  useEffect(() => {
    if (error) {
   toast.error(error?.data?.message || "Failed to fetch users");
   }

    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete user");
    }

   if (isSuccess) {
     toast.success("User deleted successfully");
       
     }
  }, [error, deleteError, isSuccess]);

     const deleteUserHandler = (id) => {
     deleteUser(id);
   };

  if (isLoading) return <Loader />;

  const setUsers = () => {
    const users = {
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
            label: "Role",
            field: "role",
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

    data?.users?.forEach((user) => {
        users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <>
            {/* Edit Order Button */}
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
               onClick={() => deleteUserHandler(user?._id)}
               disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return users;
  };

  return (
    <AdminLayout>
      <MetaData title="All Users" />

      <div>
        {/* Display total number of orders */}
        <h1 className="my-5">{data?.users?.length || 0} Users</h1>

        {/* Render the orders table */}
        <MDBDataTable
          data={setUsers()}
          className="px-3"
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
};

export default ListUsers;
