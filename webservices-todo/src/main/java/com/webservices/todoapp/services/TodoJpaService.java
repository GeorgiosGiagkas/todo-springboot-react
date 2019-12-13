package com.webservices.todoapp.services;


import com.webservices.todoapp.model.ToDo;
import com.webservices.todoapp.repositories.TodoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoJpaService {

    @Autowired
    TodoJpaRepository todoJpaRepository;

    public List<ToDo> findAllTodosByUsername(String username){
        return  todoJpaRepository.findByUsername(username);
    }

    public void deleteById(long id){
        todoJpaRepository.deleteById(id);
    }

    public ToDo findById(long id) {
        return todoJpaRepository.findById(id).get();
    }

    public ToDo save(ToDo todo){
        return todoJpaRepository.save(todo);
    }
}

