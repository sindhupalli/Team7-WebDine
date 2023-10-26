package com.web.webdine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.webdine.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	Restaurant findByName(String name);

//	@Query("SELECT r FROM Restaurant r WHERE r.owner.id=:userId")
	List<Restaurant> findRestaurantsByOwnerId(@Param("userId") Long userId);
	
	@Query("SELECT r FROM Restaurant r WHERE r.owner.id=:userId")
	List<Restaurant>findUsersRestaurant(@Param("userId")Long userId);




}
