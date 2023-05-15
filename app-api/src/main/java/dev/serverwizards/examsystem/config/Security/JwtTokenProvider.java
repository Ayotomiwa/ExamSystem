package dev.serverwizards.examsystem.config.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
@Component
public class JwtTokenProvider {



        @Value("600000")
        private long jwtExpiration;

        private final SecretKey jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//        private final String jwtSecretKey = jwtSecret;

        public String generateToken(Authentication authentication) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + jwtExpiration);
//            SecretKey jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

            System.out.println("jwtSecret: " + jwtSecretKey);

            return Jwts.builder()
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(now)
                    .setExpiration(expiryDate)
                    .signWith(jwtSecretKey)
                    .compact();
        }

    public String getUsernameFromToken(String token) {
//        byte[] jwtSecretKey = Base64.getEncoder().encode(jwtSecret.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecretKey)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}



