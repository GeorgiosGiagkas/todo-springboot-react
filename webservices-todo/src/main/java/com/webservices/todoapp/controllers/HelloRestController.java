package com.webservices.todoapp.controllers;


import com.webservices.todoapp.dto.Hello;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloRestController {

    @GetMapping(path = "/hello/{name}")
    public Hello getHello(@PathVariable String name){
        Hello hw = new Hello();
        hw.setMessage(String.format("Hello "+name));
        return  hw;
    }
}

