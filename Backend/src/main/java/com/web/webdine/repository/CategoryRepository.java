package com.web.webdine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	public List<Category> findByRestaurantId(Long id);
}
