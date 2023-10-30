package com.web.webdine.service;

import java.util.List;

import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.IngredientCategory;
import com.web.webdine.model.IngredientsItem;
import com.web.webdine.model.Food;
import com.web.webdine.repository.IngredientsCategoryRepository;

public interface IngredientsService {
	
	public IngredientCategory createIngredientsCategory(
			String name,Long restaurantId) throws RestaurantException;
	
	public List<IngredientsItem> findRestaurantsIngredients(
			Long restaurantId);
	
//	public List<IngredientsItem> findFoodsIngredients(Long menuItemId);
	
	public IngredientsItem createIngredientsItem(Long restaurantId, 
			String ingredientName,String ingredientCategory) throws RestaurantException;

	public IngredientsItem updateStoke(Long id) throws Exception;
	
}
