package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.model.User;
import dev.serverwizards.examsystem.service.implementation.CustomUserDetailsService;
import dev.serverwizards.examsystem.service.implementation.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final CustomUserDetailsService customUserDetailsService;
    private final TokenBlacklistService tokenBlacklistService;

    public UserController(CustomUserDetailsService customUserDetailsService, TokenBlacklistService tokenBlacklistService) {
        this.customUserDetailsService = customUserDetailsService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        System.out.println("User: " + user.getUsername() + " " + user.getEmail());
        if(user.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required");
        }
        if (user.getUsername() == null) {
           user.setUsername(user.getEmail().substring(0, user.getEmail().indexOf("@")));
        }
        System.out.println("User: " + user.getUsername() + " " + user.getEmail());
        if (customUserDetailsService.existsByUsernameOrEmail(user.getUsername(), user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with the same username or email already exists.");
        }
        return ResponseEntity.ok(customUserDetailsService.save(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
            System.out.println("Blacklisted token: " + token);
            System.out.println("Blacklisted tokens: " + tokenBlacklistService.getBlacklistedTokens());
        } else {
            System.out.println("Token not found in the header");
        }

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged out successfully.");
    }


}
