package dev.serverwizards.examsystem.controller;


import dev.serverwizards.examsystem.model.User;
import dev.serverwizards.examsystem.service.implementation.CustomUserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sign-up")
public class UserController {

    private final CustomUserDetailsService customUserDetailsService;

    public UserController(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("")
    public ResponseEntity<User>signUp(@RequestBody User user) {
        if (customUserDetailsService.existsByUsernameOrEmail(user.getUsername(), user.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(customUserDetailsService.save(user));
    }

}
