package com.eventmanagement.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    // =========================
    // REGISTER / SIGNUP
    // =========================

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {

        try {

            User registeredUser =
                    authService.register(user);

            return ResponseEntity.ok(registeredUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {

        try {

            User loggedInUser =
                    authService.login(
                            user.getEmail(),
                            user.getPassword()
                    );

            return ResponseEntity.ok(loggedInUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .body(e.getMessage());
        }
    }
}