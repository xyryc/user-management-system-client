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
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
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

  const handlePayment = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ isPaid: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const updatedUsers = users.map((user) =>
            user._id === id ? { ...user, isPaid: true } : user
          );
          setUsers(updatedUsers);
          Swal.fire("Success", "Payment updated successfully", "success");
        }
      })
      .catch((error) => console.error("Error updating payment:", error));
  };

  return (
    <div>
      {/* new user button */}
      <div className="flex justify-around items-center space-x-6">
        <Link to={`/adduser`} className="btn btn-outline my-4">
          Add New User
        </Link>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search User by Name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th></th>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Salary Status</th>
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
                  {user.isPaid ? (
                    "Paid"
                  ) : (
                    <button
                      onClick={() => handlePayment(user._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Pay
                    </button>
                  )}
                </td>
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
    </div>
  );
};

export default AllData;
