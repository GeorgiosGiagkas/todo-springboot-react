package com.webservices.todoapp.services;


import com.webservices.todoapp.jwt.JwtUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("jwtInMemoryUserDetailsService")
public class JwtInMemoryUserDetailsService implements UserDetailsService {

    static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
    static{
        inMemoryUserList.add(new JwtUserDetails(1L,"root",
                "$2y$12$8nmZYrvGAbKHPHEP4bRT..hjMOLyodvxfyiARyMdzZBvy0Zjl7xr.","ROLE_USER_2"));

        inMemoryUserList.add(new JwtUserDetails(2L,"root2",
                "$2y$12$pH4AeY7kl9GAX2rKDSRs/.dajZmIZm73KRkXlWOubA.PMxT8pP.Jq","ROLE_USER_2"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<JwtUserDetails> findFirst=inMemoryUserList.stream().filter(user->user.getUsername().equals(username)).findFirst();
        if(!findFirst.isPresent()){
            throw  new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'",username));
        }
        return findFirst.get();
    }
}
