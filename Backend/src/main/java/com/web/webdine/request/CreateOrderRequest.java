package com.web.webdine.request;

import com.web.webdine.model.Address;


public class CreateOrderRequest {
 
	private Long restaurantId;
	
	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Address getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	private Address deliveryAddress;
	
    
}
