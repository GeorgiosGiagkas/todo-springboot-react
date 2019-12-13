package com.webservices.todoapp.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil implements Serializable {

    static final String CLAIM_KEY_USERNAME="sub";
    static final String CLAIM_KEY_CREATED="iat";
    private static final long serialVersionUID= 1L;
    private Clock clock= DefaultClock.INSTANCE;

    @Value("${jwt.signing.key.secret}")
    private String secret;

    @Value("${jwt.token.expiration.in.seconds}")
    private Long expiration;

    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public <T> T getClaimFromToken(String token , Function<Claims,T> claimsResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token){
        return getClaimFromToken(token,Claims::getSubject);
    }

    public Date getIssuedAtDateFromToken(String token){
        return getClaimFromToken(token,Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token,Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token){
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(clock.now());
    }

    private Boolean ignoreTokenExpiration(String token){
        // here you specify tokens, for that the expiration is ignored
        return false;
    }

    private String doGenerateToken(Map<String,Object> claims, String subject){
        final Date createdDate = clock.now();
        final Date expirationDate = calculateExpirationDate(createdDate);
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(createdDate).
                setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512,this.secret).compact();
    }

    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    private Date calculateExpirationDate(Date createdDate){
        return new Date(createdDate.getTime()+expiration*1000);
    }

    public Boolean canTokenBeRefreshed(String token){
        return (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    public String refreshToken(String token){
        final Date createDate =clock.now();
        final Date expirationDate = calculateExpirationDate(createDate);

        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createDate);
        claims.setExpiration(expirationDate);

        return  Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        JwtUserDetails user =(JwtUserDetails) userDetails;
        final String username = getUsernameFromToken(token);
        return (username.equals(user.getUsername())&& !isTokenExpired(token));
    }
}





