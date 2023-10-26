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
import org.springframework.web.bind.annotation.RestController;

import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.Exception.UserException;
import com.web.webdine.model.Restaurant;
import com.web.webdine.model.User;
import com.web.webdine.request.CreateRestaurantRequest;
import com.web.webdine.response.ApiResponse;
import com.web.webdine.service.RestaurantService;
import com.web.webdine.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminRestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private UserService userService;

	@PostMapping("/restaurant")
	public ResponseEntity<Restaurant> createRestaurant(
			@RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			System.out.println("----TRUE___-----"+jwt);
			Restaurant restaurant = restaurantService.createRestaurant(req,user);
			return ResponseEntity.ok(restaurant);
		
	}


	@PutMapping("/restaurant/{id}")
	public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody CreateRestaurantRequest req,
			@RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			Restaurant restaurant = restaurantService.updateRestaurant(id, req);
			return ResponseEntity.ok(restaurant);
		
	}

	@DeleteMapping("/restaurant/{id}")
	public ResponseEntity<ApiResponse> deleteRestaurantById(@PathVariable("id") Long restaurantId,
			@RequestHeader("Authorization") String jwt) throws RestaurantException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			restaurantService.deleteRestaurant(restaurantId);
			
			ApiResponse res=new ApiResponse("Restaurant Deleted with id Successfully",true);
			return ResponseEntity.ok(res);
	
		
	}

	
	@GetMapping("/restaurants/user")
	public ResponseEntity<List<Restaurant>> getUsersRestaurant(@RequestHeader("Authorization") String jwt) throws UserException, RestaurantException {
		User user = userService.findUserProfileByJwt(jwt);
		List<Restaurant> restaurants = restaurantService.getRestaurantsByUserId(user.getId());
		return ResponseEntity.ok(restaurants);
	}
	
	@PutMapping("/restaurant/{id}/status")
	public ResponseEntity<Restaurant> updateStataurantStatus(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws RestaurantException, UserException {
		
			Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
			return ResponseEntity.ok(restaurant);
		
	
	
	}
	
	

}
