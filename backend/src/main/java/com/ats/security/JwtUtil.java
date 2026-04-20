package com.ats.security;

import com.ats.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expirationMs;

    public JwtUtil(
            @Value("${ats.jwt.secret}") String secret,
            @Value("${ats.jwt.expiration-ms:86400000}") long expirationMs) {
        try {
            byte[] raw = secret.getBytes(StandardCharsets.UTF_8);
            byte[] keyBytes = MessageDigest.getInstance("SHA-256").digest(raw);
            this.key = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to init JWT key", e);
        }
        this.expirationMs = expirationMs;
    }

    public String generateToken(Long userId, String email, Role role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .claims(Map.of(
                        "uid", userId,
                        "email", email,
                        "role", role.name()
                ))
                .subject(email)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key)
                .compact();
    }

    public String getEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public Long getUserId(String token) {
        Object uid = parseClaims(token).get("uid");
        if (uid instanceof Number n) {
            return n.longValue();
        }
        throw new IllegalArgumentException("Invalid token");
    }

    public boolean validate(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
