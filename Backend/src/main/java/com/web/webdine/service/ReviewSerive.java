package com.web.webdine.service;

import java.util.List;

import com.web.webdine.Exception.ReviewException;
import com.web.webdine.model.Review;
import com.web.webdine.model.User;
import com.web.webdine.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
}
