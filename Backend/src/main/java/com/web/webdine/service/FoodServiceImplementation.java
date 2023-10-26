package com.web.webdine.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.Category;
import com.web.webdine.model.IngredientsItem;
import com.web.webdine.model.Food;
import com.web.webdine.model.Restaurant;
import com.web.webdine.repository.IngredientsCategoryRepository;
import com.web.webdine.repository.foodRepository;
import com.web.webdine.repository.RestaurantRepository;
import com.web.webdine.request.CreateFoodRequest;
import com.web.webdine.request.Ingredient;

@Service
public class FoodServiceImplementation implements FoodService {
	@Autowired
	private foodRepository foodRepository;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private IngredientsService ingredientService;
	
	@Autowired
	private IngredientsCategoryRepository ingredientCategoryRepo;

	@Override
	public Food createFood(CreateFoodRequest  req) throws FoodException, 
	RestaurantException {
		
		Category category=categoryService.findCategoryById(req.getCategoryId());
			
			Food food=new Food();
			food.setFoodCategory(category);
			food.setCreationDate(new Date());
			food.setDescription(req.getDescription());
			food.setImageUrl(req.getImageUrl());
			food.setName(req.getName());
			food.setPrice((long) req.getPrice());
			food.setSeasonal(req.isSeasonal());		
			food.setVegetarian(req.isVegetarian());
			
			Long restaurantId=req.getRestaurantId();
			
			Optional<Restaurant> opt = restaurantRepository.findById(restaurantId);
			System.out.println("Restaurant object---- "+req.isSeasonal()+
					req.isVegetarian());
			if(opt.isPresent()) {
				food.setRestaurant(opt.get());
				
			}else {
				throw new RestaurantException("Restaurant not found with id "+restaurantId);
			}
			food = foodRepository.save(food);
			
			for(Ingredient ingredient : req.getIngredients()) {
				
				System.out.println( " ---- "+ingredient.getCategoryName()+ " - "+ingredient.getIngredientName());
				
				
					IngredientsItem ingredientItem=ingredientService
							.createIngredientsItem(restaurantId,
									ingredient.getIngredientName(),
									ingredient.getCategoryName()
									);
					food.getIngredients().add(ingredientItem);

			}
			
			return food;
		
	}

	@Override
	public void deleteFood(Long foodId) throws FoodException {
		Food food=findFoodById(foodId);
		food.setRestaurant(null);;
		foodRepository.save(food);

	}


	@Override
	public List<Food> getRestaurantsFood(
			Long restaurantId, 
			boolean isVegetarian, 
			boolean isNonveg,
			boolean isSeasonal,
			String foodCategory) throws FoodException {
		List<Food> foods = foodRepository.findByRestaurantId(restaurantId);
		
		
		
	    if (isVegetarian) {
	        foods = filterByVegetarian(foods, isVegetarian);
	    }
	    if (isNonveg) {
	        foods = filterByNonveg(foods, isNonveg);
	    }

	    if (isSeasonal) {
	        foods = filterBySeasonal(foods, isSeasonal);
	    }
	    if(foodCategory!=null && !foodCategory.equals("")) {
	    	foods = filterByFoodCategory(foods, foodCategory);
	    }
		
		return foods;
		
	}
	
	private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
	    return foods.stream()
	            .filter(food -> food.isVegetarian() == isVegetarian)
	            .collect(Collectors.toList());
	}
	private List<Food> filterByNonveg(List<Food> foods, boolean isNonveg) {
	    return foods.stream()
	            .filter(food -> food.isVegetarian() == false)
	            .collect(Collectors.toList());
	}
	private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
	    return foods.stream()
	            .filter(food -> food.isSeasonal() == isSeasonal)
	            .collect(Collectors.toList());
	}
	private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {
	    
		return foods.stream()
			    .filter(food -> {
			        if (food.getFoodCategory() != null) {
			            return food.getFoodCategory().getName().equals(foodCategory);
			        }
			        return false; // Return true if food category is null
			    })
			    .collect(Collectors.toList());
	}

	@Override
	public List<Food> searchFood(String keyword) {
		List<Food> items=new ArrayList<>();
		
		if(keyword!="") {
			System.out.println("keyword -- "+keyword);
			items=foodRepository.searchByNameOrCategory(keyword);
		}
		
		return items;
	}

	@Override
	public Food updateAvailibilityStatus(Long id) throws FoodException {
		Food food = findFoodById(id);
		
		food.setAvailable(!food.isAvailable());
		foodRepository.save(food);
		return food;
	}

	@Override
	public Food findFoodById(Long foodId) throws FoodException {
		Optional<Food> food = foodRepository.findById(foodId);
		if (food.isPresent()) {
			return food.get();
		}
		throw new FoodException("food with id" + foodId + "not found");
	}

}
