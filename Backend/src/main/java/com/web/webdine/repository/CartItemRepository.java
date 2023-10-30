package com.web.webdine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
