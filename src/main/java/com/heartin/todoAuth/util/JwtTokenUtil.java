package com.heartin.todoAuth.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
 
@Component
public class JwtTokenUtil {
 
    //@Value("${jwt.secret}")
    private String secret = "7rn8hte2s2ib0g05kztp";
 
    @Value("${jwt.expiration}")
    private long expiration = 900000000;
 
    public String generateToken(String username) {
        long now = System.currentTimeMillis();
        Date expiryDate = new Date(now + expiration);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
 
    public boolean validateToken(String token, String username) {
    	if (token == null || token.isEmpty()) {
            // JWT字符串为空，返回验证失败
            return false;
        }

        try {
            String userNameFromToken = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return (userNameFromToken.equals(username) && !isTokenExpired(token));
        } catch (Exception ex) {
            //ex.printStackTrace();
            System.out.println("JWT expired. " );
            // 验证出错时返回验证失败
            return false;
        }
//        String userNameFromToken = Jwts.parser()
//                .setSigningKey(secret)
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//        return (userNameFromToken.equals(username) && !isTokenExpired(token));
    }
 
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}