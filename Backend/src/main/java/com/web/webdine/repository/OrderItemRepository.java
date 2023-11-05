package com.web.webdine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
