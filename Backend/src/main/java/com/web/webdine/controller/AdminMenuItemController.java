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
@RequestMapping("/api/admin")
public class AdminMenuItemController {
	
	@Autowired
	private FoodService menuItemService;
	@Autowired
	private UserService userService;

	@PostMapping("/menu")
	public ResponseEntity<Food> createItem(
			@RequestBody CreateFoodRequest item, 
			@RequestHeader("Authorization") String jwt)
			throws FoodException, UserException, RestaurantException {
		System.out.println("req-controller ----"+item);
		User user = userService.findUserProfileByJwt(jwt);
		

			Food menuItem = menuItemService.createFood(item);


			return ResponseEntity.ok(menuItem);

	}

//	@PutMapping("/menu/{id}")
//	public ResponseEntity<MenuItem> updateItem(@PathVariable Long id, @RequestBody MenuItem upddatedMenuItem,
//			@RequestHeader("Authorization") String jwt) throws MenuItemException, UserException {
//		User user = userService.findUserProfileByJwt(jwt);
//		if (user.getRole().equals("ROLE_RESTAURANT_OWNER")) {
//			MenuItem updateMenuItem = menuItemService.updateMenuItem(id, upddatedMenuItem);
//			return ResponseEntity.ok(updateMenuItem);
//		}
//		throw new UserException("User not authorize to update menu");
//	}

	@DeleteMapping("/menu/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws UserException, FoodException {
		User user = userService.findUserProfileByJwt(jwt);
		
			menuItemService.deleteFood(id);
			return ResponseEntity.ok("Menu item deleted");
		
	
	}

	

	@GetMapping("/menu/search")
	public ResponseEntity<List<Food>> getMenuItemByName(@RequestParam String name)  {
		List<Food> menuItem = menuItemService.searchFood(name);
		return ResponseEntity.ok(menuItem);
	}
	
	
	@PutMapping("/menu/{id}")
	public ResponseEntity<Food> updateAvilibilityStatus(
			@PathVariable Long id) throws FoodException {
		Food menuItems= menuItemService.updateAvailibilityStatus(id);
		return ResponseEntity.ok(menuItems);
	}
	
	

}
