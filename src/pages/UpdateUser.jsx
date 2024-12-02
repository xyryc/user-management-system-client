import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";

const UpdateUser = () => {
  const loadedData = useLoaderData();

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const job = form.job.value;
    const updatedUser = { name, email, job };

    // send data to server api
    fetch(`http://localhost:5000/users/${loadedData?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <p className="text-left">
        <Link to={"/"} className="btn btn-link text-secondary">
        <MdKeyboardBackspace/> Back to All Users
        </Link>
      </p>

      <h2 className="text-3xl font-bold mb-2">Update User</h2>
      <p className="font-medium mb-4">Use the below form to Update user data</p>

      <form onSubmit={handleUpdateUser} className="space-y-4 max-w-xl mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            name="name"
            type="text"
            className="grow"
            placeholder="Adam"
            defaultValue={loadedData?.name}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            name="email"
            type="text"
            className="grow"
            placeholder="adam@gmail.com"
            defaultValue={loadedData?.email}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Job
          <input
            name="job"
            type="text"
            className="grow"
            placeholder="Software Developer"
            defaultValue={loadedData?.job}
          />
        </label>

        <input type="submit" value="Update User" className="btn btn-neutral" />
      </form>
    </div>
  );
};

export default UpdateUser;
