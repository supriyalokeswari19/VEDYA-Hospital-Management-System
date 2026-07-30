package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hms.entity.User;
import java.util.Optional;
import java.util.List;
public interface UserRepository
        extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);
	List<User> findByStatus(String status);
	Optional<User> findByUserId(Integer userId);
}