package com.eventmanagement.backend.service;

import org.springframework.stereotype.Service;

import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;


    // Constructor
    public AuthService(UserRepository userRepository) {

        this.userRepository = userRepository;

    }


    // =========================
    // REGISTER / SIGNUP
    // =========================

    public User register(User user) {

        // Check username already exists
        if (userRepository.existsByUsername(user.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }


        // Check email already exists
        if (userRepository.existsByEmail(user.getEmail())) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }


        // Default role
        if (user.getRole() == null ||
            user.getRole().isBlank()) {

            user.setRole("USER");

        }


        // Save user to MySQL
        return userRepository.save(user);

    }


    // =========================
    // LOGIN
    // =========================

    public User login(
            String email,
            String password
    ) {

        // Find user using email
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid username or password"
                        )
                );


        // Check password
        if (!user.getPassword().equals(password)) {

            throw new RuntimeException(
                    "Invalid username or password"
            );

        }


        // Login successful
        return user;

    }

}