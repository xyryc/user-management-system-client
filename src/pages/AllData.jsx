import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllData = () => {
  const loadedData = useLoaderData();
  const [users, setUsers] = useState(loadedData);

  const handleUserDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // send req to server
        fetch(
          `https://user-management-system-server-nine.vercel.app/users/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });

              const remaining = users.filter((user) => user._id !== id);
              setUsers(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      {/* new user button */}
      <Link to={`/adduser`} className="btn btn-outline my-4">
        Add New User
      </Link>

      <table className="table">
        {/* head */}
        <thead className="bg-gray-800 text-white">
          <tr>
            <th></th>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user._id}>
              <th></th>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.job}</td>
              <td>
                <Link to={`/updateuser/${user._id}`} className="btn btn-xs">
                  <FiEdit2 />
                </Link>
                <button
                  onClick={() => handleUserDelete(user._id)}
                  className="btn btn-xs"
                >
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllData;
