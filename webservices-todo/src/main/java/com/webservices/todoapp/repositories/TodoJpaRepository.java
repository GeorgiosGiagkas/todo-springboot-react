package com.webservices.todoapp.repositories;


import com.webservices.todoapp.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoJpaRepository extends JpaRepository<ToDo,Long> {

    List<ToDo> findByUsername(String username);

}
