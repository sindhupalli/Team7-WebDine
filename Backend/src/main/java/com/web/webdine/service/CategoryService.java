package com.web.webdine.service;

import java.util.List;

import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.Category;

public interface CategoryService {
	
	public Category createCategory (Category category) throws RestaurantException;
	public List<Category> findCategoryByRestaurantId(Long restaurantId);
	public Category findCategoryById(Long id) throws RestaurantException;

}
