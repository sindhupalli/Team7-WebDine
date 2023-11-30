import { Button, Card } from "@mui/material";
import React from "react";
import { useNavigate} from "react-router-dom";
const OrderCard = ({order}) => {
  const navigate = useNavigate();
  //console.log("order",order);
  //const [orderStatus, setOrderStatus] = useState('pending');
  const navigateToRestaurant = () => {
    if(order.food.restaurant.open)
    navigate(`/restaurant/${order.food.restaurant.address.city}/${order.food.restaurant.name}/${order.food.restaurant.id}`);
  };

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

      {/* {orderStatus === 'pending' && !isOutOfStock ? (
          <Button variant="contained" onClick={navigateToRestaurant}>
            Replace
          </Button>
        ) : (
          <p>Order cannot be replaced at the moment.</p>
        )} */}
        
        <Button variant="contained" onClick={navigateToRestaurant}>Replace</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
