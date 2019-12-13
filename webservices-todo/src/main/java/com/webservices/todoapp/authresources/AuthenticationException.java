package com.webservices.todoapp.authresources;

public class AuthenticationException extends  RuntimeException{

    public AuthenticationException(String message, Throwable cause){
        super(message, cause);
    }

}