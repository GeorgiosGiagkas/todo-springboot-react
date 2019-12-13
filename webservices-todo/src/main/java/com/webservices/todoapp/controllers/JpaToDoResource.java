package com.webservices.todoapp.controllers;


import com.webservices.todoapp.model.ToDo;
import com.webservices.todoapp.services.TodoJpaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JpaToDoResource {

    @Autowired
    private TodoJpaService toDoService;


    @GetMapping(path="jpa/users/{username}/todos")
    public List<ToDo> getAllTodos(@PathVariable String username){
        return toDoService.findAllTodosByUsername(username);
    }

    @GetMapping(path="jpa/users/{username}/todos/{id}")
    public ToDo getTodo(@PathVariable String username, @PathVariable long id){
        return toDoService.findById(id);
    }

    @DeleteMapping(path="jpa/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
        toDoService.deleteById(id);
        return ResponseEntity.noContent().build();

    }

    @PutMapping(path="jpa/users/{username}/todos/{id}")
    public ResponseEntity<ToDo> updateTodo(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody ToDo todo)
    {
        todo.setUsername(username);
        ToDo toDoUpdated=toDoService.save(todo);
        return  new ResponseEntity<ToDo>(toDoUpdated, HttpStatus.OK);
    }

    @PostMapping(path="jpa/users/{username}/todos")
    public  ResponseEntity<Void> addTodo(
            @PathVariable String username,
            @RequestBody ToDo todo)
    {
        todo.setUsername(username);
        ToDo createdTodo = toDoService.save(todo);

        //return the current source url
        URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();

        return  ResponseEntity.created(uri).build();
    }

}


