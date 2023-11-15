package com.web.webdine.service;

import java.util.List;

import com.web.webdine.model.Notification;
import com.web.webdine.model.Order;
import com.web.webdine.model.Restaurant;
import com.web.webdine.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
