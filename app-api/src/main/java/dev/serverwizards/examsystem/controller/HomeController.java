package dev.serverwizards.examsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class HomeController{

  @GetMapping("/")
  public ResponseEntity<String> homeGreeting(){
    String greeting = "Welcome to the Exam System API **WINK WINK*";
    StringBuilder greetingBuilder = new StringBuilder("");
    for (int i = 0; i < 30; i++){
      greetingBuilder.append(greeting).append("\n");
    }
    return ResponseEntity.ok(greetingBuilder.toString());
  }
}