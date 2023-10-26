package com.web.webdine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.webdine.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
