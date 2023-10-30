package com.web.webdine.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.webdine.Exception.FoodException;
import com.web.webdine.Exception.RestaurantException;
import com.web.webdine.model.IngredientCategory;
import com.web.webdine.model.IngredientsItem;
import com.web.webdine.model.Food;
import com.web.webdine.model.Restaurant;
import com.web.webdine.repository.IngredientsCategoryRepository;
import com.web.webdine.repository.IngredientsItemRepository;

@Service
public class IngredientsServiceImplementation implements IngredientsService {

	@Autowired
	private IngredientsCategoryRepository ingredientsCategoryRepo;
	
	@Autowired
	private IngredientsItemRepository ingredientsItemRepository;
	
	
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Override
	public IngredientCategory createIngredientsCategory(
			String name,Long restaurantId) throws RestaurantException {
		
		IngredientCategory isExist=ingredientsCategoryRepo
				.findByRestaurantIdAndNameIgnoreCase(restaurantId,name);
		
		
		if(isExist!=null) {
			return isExist;
		}
		
		
		Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
		
		IngredientCategory ingredientCategory=new IngredientCategory();
		ingredientCategory.setRestaurant(restaurant);
		ingredientCategory.setName(name);
		
		IngredientCategory createdCategory = ingredientsCategoryRepo.save(ingredientCategory);
		
		return createdCategory;
	}

	@Override
	public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {
		// TODO Auto-generated method stub
		return ingredientsItemRepository.findByRestaurantId(restaurantId);
	}
	

	@Override
	public IngredientsItem createIngredientsItem(Long restaurantId, 
			String ingredientName, String categoryName) throws RestaurantException {
		
		IngredientCategory category = createIngredientsCategory(
				categoryName
				, restaurantId);
		
		IngredientsItem isExist = ingredientsItemRepository.
				findByRestaurantIdAndNameIngoreCase(restaurantId, ingredientName,categoryName);
		if(isExist!=null) {
			System.out.println("is exists-------- item");
			return isExist;
		}
		
		Restaurant restaurant=restaurantService.findRestaurantById(
				restaurantId);
		IngredientsItem item=new IngredientsItem();
		item.setName(ingredientName);
		item.setRestaurant(restaurant);
		item.setCategory(category);
		
		IngredientsItem savedIngredients = ingredientsItemRepository.save(item);
		category.getIngredients().add(savedIngredients);
		ingredientsCategoryRepo.save(category);
		return savedIngredients;
	}

//	@Override
//	public List<IngredientsItem> findFoodsIngredients(Long menuItemId) {
//		// TODO Auto-generated method stub
//		return ingredientsCategoryRepo.findByFoodId(menuItemId);
//	}

	@Override
	public IngredientsItem updateStoke(Long id) throws Exception {
		Optional<IngredientsItem> item=ingredientsItemRepository.findById(id);
		if(item.isEmpty()) {
			throw new Exception("ingredient not found with id "+item);
		}
		IngredientsItem ingredient=item.get();
		ingredient.setInStoke(!ingredient.isInStoke());
		return ingredientsItemRepository.save(ingredient);
	}

	

}
