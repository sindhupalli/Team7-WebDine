package com.web.webdine.service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.web.webdine.Exception.CartException;
import com.web.webdine.Exception.OrderException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.Exception.UserException;
import com.web.webdine.model.Order;
import com.web.webdine.model.PaymentResponse;
import com.web.webdine.model.User;
import com.web.webdine.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
