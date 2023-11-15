package com.web.webdine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
