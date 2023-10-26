package com.web.webdine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.Category;
import com.web.webdine.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	public CategoryService categoryService;
	
	@PostMapping("/admin/category")
	public ResponseEntity<Category> createdCategory(@RequestBody Category category) throws RestaurantException{
		
		Category createdCategory=categoryService.createCategory(category);
		return new ResponseEntity<Category>(createdCategory,HttpStatus.OK);
	}
	
	@GetMapping("/category/restaurant/{id}")
	public ResponseEntity<List<Category>> getRestaurantsCategory(
			@PathVariable Long id) throws RestaurantException{
		
		List<Category> categories=categoryService.findCategoryByRestaurantId(id);
		return new ResponseEntity<>(categories,HttpStatus.OK);
	}
	

}
