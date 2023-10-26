package com.web.webdine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.Exception.UserException;
import com.web.webdine.model.Food;
import com.web.webdine.model.User;
import com.web.webdine.request.CreateFoodRequest;
import com.web.webdine.service.FoodService;
import com.web.webdine.service.UserService;

@RestController
@RequestMapping("/api")
public class MenuItemController {
	@Autowired
	private FoodService menuItemService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/menu/search")
	public ResponseEntity<List<Food>> getMenuItemByName(
			@RequestParam String name)  {
		List<Food> menuItem = menuItemService.searchFood(name);
		return ResponseEntity.ok(menuItem);
	}
	@GetMapping("/menu/restaurant/{restaurantId}")
	public ResponseEntity<List<Food>> getMenuItemByRestaurantId(
			@PathVariable Long restaurantId,
			@RequestParam boolean vegetarian,
			@RequestParam boolean seasonal,
			@RequestParam boolean nonveg,
			@RequestParam(required = false) String food_category) throws FoodException {
		List<Food> menuItems= menuItemService.getRestaurantsFood(
				restaurantId,vegetarian,nonveg,seasonal,food_category);
		return ResponseEntity.ok(menuItems);
	}
	


}
