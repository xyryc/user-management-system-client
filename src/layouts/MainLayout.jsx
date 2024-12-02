import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="text-center">
      <Header />

      
      <div className="my-10">
      <Outlet /></div> 
    </div>
  );
};

export default MainLayout;
