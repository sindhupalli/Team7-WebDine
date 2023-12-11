import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";

const categories = [
  "Thali",
  "Starters",
  "Indian Main Course",
  "Rice and Biryani",
  "Breads",
  "Accompaniments",
  "Dessert",
];

const foodTypes = [
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  {label:"Seasonal",value:"seasonal"},
  {label:"All",value:"all"},
];
const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  console.log("Restaurants", restaurant, id);
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  useEffect(() => {
    dispatch(
      getRestaurantById({
        token: localStorage.getItem("jwt"),
        restaurantId: id,
      })
    );
    dispatch(
      getMenuItemsByRestaurantId({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
        seasonal: foodType==="seasonal",
        vegetarian: foodType==="vegetarian",
        nonveg: foodType==="non_vegetarian",
        foodCategory: foodCategory || ""
      })
    );
    dispatch(getRestaurantsCategory(id))
  }, [id,foodType,foodCategory]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div className="px-5 lg:px-20 ">
      <section>
        <h3 className="text-gray-500 py-2 mt-20">
          Home/{restaurant.restaurant?.address.country}/
          {restaurant.restaurant?.name}/{restaurant.restaurant?.id}/Order Online
        </h3>
        <div>
          <img
            className="w-full h-[40vh] object-cover"
            src={restaurant.restaurant?.imageUrl}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-4xl py-1 font-semibold">
            {restaurant.restaurant?.name}
          </h1>
          <p className="text-gray-500">{restaurant.restaurant?.description}</p>
          <p className="text-gray-500">
            {restaurant.restaurant?.address.streetAddress}
          </p>
          <p className="py-3 text-orange-300">
            {restaurant.restaurant?.openingHours}
          </p>
        </div>
      </section>
      <Divider />

      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] ">
          <div className="box space-y-5 lg:sticky top-28">
            {/* <div>
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Category
              </Typography>
              <FormControl className="py-10" component="fieldset">
                <RadioGroup
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category, index) => (
                    <FormControlLabel
                      key={index}
                      value={category}
                      control={<Radio />}
                      label={category}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div> */}
            {/* <Divider /> */}
            <div className="">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  name="food_type"
                  value={foodType}
                  onChange={handleFilter}
                >
                  {foodTypes?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
                <Divider/>
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Category
              </Typography>
                <RadioGroup
                  name="food_category"
                  value={foodCategory}
                  onChange={handleFilter}
                >
                  {restaurant?.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {menu?.menuItems.map((item) => (
            <MenuItemCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Restaurant;
