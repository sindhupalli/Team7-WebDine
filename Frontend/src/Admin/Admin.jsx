import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import RestaurantDashboard from "./Dashboard/RestaurantDashboard";
import RestaurantsOrder from "./Orders/RestaurantsOrder";
import RestaurantsMenu from "./MenuItem/RestaurantsMenu";
import AddMenuForm from "./AddMenu/AddMenuForm";
import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm";
import IngredientTable from "./Events/Events";
import CreateCategory from "./Category/CreateCategory";
import Navbar from "./Navbar";

const Admin = () => {
  return (
   <>
   <Navbar/>
    <div className="lg:flex justify-between">
      <div className="">
       
        <AdminSidebar />
      </div>

      <div className="w-[80vw]">
        <Routes>
          <Route path="/" element={<RestaurantDashboard/>} />
          <Route path="/orders" element={<RestaurantsOrder/>} />
          <Route path="/menu" element={<RestaurantsMenu/>} />
          <Route path="/add-menu" element={<AddMenuForm/>} />
          <Route path="/add-restaurant" element={<CreateRestaurantForm/>} />
          <Route path="/event" element={<IngredientTable/>} />
          <Route path="/add-category" element={<CreateCategory/>} />
        </Routes>
      </div>
    </div>
   </>
  );
};

export default Admin;
