package com.web.webdine.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.webdine.model.IngredientCategory;
import com.web.webdine.model.IngredientsItem;
import com.web.webdine.service.IngredientsService;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientsController {
	
	@Autowired
	private IngredientsService ingredientService;
	
	
//	@GetMapping("/food/{menuItem}")
//	public ResponseEntity<List<IngredientCategory>> findIngredientByMenuItemId(
//			@PathVariable Long menuItem){
//		List<IngredientCategory> res=ingredientService.
//				findFoodsIngredients(menuItem);
//		
//		return new ResponseEntity<>(res,HttpStatus.OK);
//	}
	
	@PutMapping("/{id}/stoke")
	public ResponseEntity<IngredientsItem> updateStoke(@PathVariable Long id) throws Exception{
		IngredientsItem item=ingredientService.updateStoke(id);
		return new ResponseEntity<IngredientsItem>(item,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<IngredientsItem>> restaurantsIngredient(
			@PathVariable Long id) throws Exception{
		List<IngredientsItem> items=ingredientService.findRestaurantsIngredients(id);
		return new ResponseEntity<>(items,HttpStatus.OK);
	}

}
