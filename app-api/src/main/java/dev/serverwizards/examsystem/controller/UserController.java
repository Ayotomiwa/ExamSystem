package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.model.User;
import dev.serverwizards.examsystem.service.implementation.CustomUserDetailsService;
import dev.serverwizards.examsystem.service.implementation.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<User>signUp(@RequestBody User user) {
        if (customUserDetailsService.existsByUsernameOrEmail(user.getUsername(), user.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(customUserDetailsService.save(user));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // You can implement any additional log-out logic here, such as blacklisting the token on the server-side.

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
            System.out.println("Blacklisted token: " + token);
            System.out.println("Blacklisted tokens: " + tokenBlacklistService.getBlacklistedTokens());
        } else {
            System.out.println("Token not found in the header");
        }

        // Clear authentication information
        SecurityContextHolder.clearContext();

        // Return a successful log-out response
        return ResponseEntity.ok("Logged out successfully.");
    }


}
