import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const handleAddUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const job = form.job.value;
    const newUser = { name, email, job };

    // send data to server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "User added to database",
            icon: "success",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p className="text-left">
        <Link to={"/"} className="btn btn-link text-secondary">
          <MdKeyboardBackspace/>  Back to All Users
        </Link>
      </p>

      <h2 className="text-3xl font-bold mb-2">New User</h2>
      <p className="font-medium mb-4">Use the below form to create new user</p>

      <form onSubmit={handleAddUser} className="space-y-4 max-w-xl mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input name="name" type="text" className="grow" placeholder="Adam" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            name="email"
            type="text"
            className="grow"
            placeholder="adam@gmail.com"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Job
          <input
            name="job"
            type="text"
            className="grow"
            placeholder="Software Developer"
          />
        </label>

        <input type="submit" value="Add User" className="btn btn-neutral" />
      </form>
    </div>
  );
};

export default AddUser;
