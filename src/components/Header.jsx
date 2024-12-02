import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="my-10">
      <Link to={"/"} className="text-3xl font-bold ">
        User Management System
      </Link>
    </div>
  );
};

export default Header;
