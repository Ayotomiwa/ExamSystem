package dev.serverwizards.examsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class HomeController{

  @GetMapping("/")
  public ResponseEntity<String> homeGreeting(){
    for (int i =0; i< 20; i++){
      System.out.println("Welcome to the Exam System API **WINK WINK**");
    }
    return ResponseEntity.ok("Welcome to the Exam System API **WINK WINK**");
  }

}