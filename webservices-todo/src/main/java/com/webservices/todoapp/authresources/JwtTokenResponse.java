package com.webservices.todoapp.authresources;


import java.io.Serializable;

public class JwtTokenResponse implements Serializable {
    private static final long serialVersionUID = 4L;
    private final String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}

