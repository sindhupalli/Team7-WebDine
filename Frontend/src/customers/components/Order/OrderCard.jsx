import { Button, Card } from "@mui/material";
import React from "react";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../../State/Customers/Orders/Action';

const OrderCard = ({order}) => {
  const navigate = useNavigate();
  // console.log("Hi",order);
  const navigateToRestaurant = () => {
    if (order.food.restaurant.open) {
      navigate(`/restaurant/${order.food.restaurant.address.city}/${order.food.restaurant.name}/${order.food.restaurant.id}`);
    }
  };
// console.log(order);
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src={order.food.imageUrl}
          alt=""
        />
        <div>
          <p>{order.food.name}</p>
          <p className="text-gray-400">${order.food.price}</p>
        </div>
      </div>
      <div>
        <Button variant="contained"
          onClick={navigateToRestaurant}
          >Replace</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
