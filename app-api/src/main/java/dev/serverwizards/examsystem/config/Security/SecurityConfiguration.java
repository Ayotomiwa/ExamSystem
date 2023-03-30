package dev.serverwizards.examsystem.config.Security;

import dev.serverwizards.examsystem.service.implementation.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collections;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;



    public SecurityConfiguration(JwtTokenProvider tokenProvider
            , CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(Collections.singletonList(authenticationProvider));
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(tokenProvider, customUserDetailsService);

        http
                .csrf().disable()
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/exam-logs/**").hasAnyRole("ADMIN", "AUTH_USER")
                        .requestMatchers("/api/exam/**").hasAnyRole("ADMIN", "AUTH_USER")
                        .requestMatchers("/api/module/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/exam/daily").permitAll()
                        .requestMatchers("/api/sign-up").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}




