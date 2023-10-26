package com.web.webdine.service;

import java.util.List;

import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.Category;
import com.web.webdine.model.Food;
import com.web.webdine.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
