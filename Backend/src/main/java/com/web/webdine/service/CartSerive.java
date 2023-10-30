package com.web.webdine.service;

import com.web.webdine.Exception.CartException;
import com.web.webdine.Exception.CartItemException;
import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.UserException;
import com.web.webdine.model.Cart;
import com.web.webdine.model.CartItem;
import com.web.webdine.model.Food;
import com.web.webdine.model.User;
import com.web.webdine.request.AddCartItemRequest;
import com.web.webdine.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
