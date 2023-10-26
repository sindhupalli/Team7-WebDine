package com.web.webdine.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.Category;
import com.web.webdine.model.Restaurant;
import com.web.webdine.repository.CategoryRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(Category category) throws RestaurantException {
		Restaurant restaurant=restaurantService.findRestaurantById(category.getRestaurant().getId());
		Category createdCategory=new Category();
		
		createdCategory.setName(category.getName());
		createdCategory.setRestaurant(restaurant);
		return categoryRepository.save(createdCategory);
	}

	@Override
	public List<Category> findCategoryByRestaurantId(Long restaurantId) {
		// TODO Auto-generated method stub
		return categoryRepository.findByRestaurantId(restaurantId);
	}

	@Override
	public Category findCategoryById(Long id) throws RestaurantException {
		Optional<Category> opt=categoryRepository.findById(id);
		
		if(opt.isEmpty()) {
			throw new RestaurantException("category not exist with id "+id);
		}
		
		return opt.get();
	}

}
