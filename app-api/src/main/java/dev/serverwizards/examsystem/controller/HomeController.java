package dev.serverwizards.examsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;


@RestController
@RequestMapping("/")
public class HomeController{
  public ResponseEntity<String> homeGreeting(){
    return ResponseEntity.ok("Hello World");
  }

}
