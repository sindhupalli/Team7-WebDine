package com.web.webdine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.Events;

public interface EventRepository extends JpaRepository<Events, Long>{

	public List<Events> findEventsByRestaurantId(Long id);
}
