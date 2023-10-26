package com.web.webdine.request;



import java.util.List;

public class CreateFoodRequest {
	

    
    private String name;
    private String description;
    private Long price;
    
  
    private Long categoryId;
    private String imageUrl;

   
    private Long restaurantId;
    
    private boolean vegetarian;
    private boolean seasonal;
    
    
    private List<Ingredient> ingredients;


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Long getPrice() {
		return price;
	}


	public void setPrice(Long price) {
		this.price = price;
	}


	public Long getCategoryId() {
		return categoryId;
	}


	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public Long getRestaurantId() {
		return restaurantId;
	}


	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}


	public boolean isVegetarian() {
		return vegetarian;
	}


	public void setVegetarian(boolean vegetarian) {
		this.vegetarian = vegetarian;
	}


	public boolean isSeasonal() {
		return seasonal;
	}


	public void setSeasonal(boolean seasonal) {
		this.seasonal = seasonal;
	}


	public List<Ingredient> getIngredients() {
		return ingredients;
	}


	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}


	public CreateFoodRequest(String name, String description, Long price, Long categoryId, String imageUrl,
			Long restaurantId, boolean vegetarian, boolean seasonal, List<Ingredient> ingredients) {
	this.name = name;
		this.description = description;
		this.price = price;
		this.categoryId = categoryId;
		this.imageUrl = imageUrl;
		this.restaurantId = restaurantId;
		this.vegetarian = vegetarian;
		this.seasonal = seasonal;
		this.ingredients = ingredients;
	}


	public CreateFoodRequest() {
	}
	

}
