package dev.serverwizards.examsystem.config.Security;

import dev.serverwizards.examsystem.service.implementation.CustomUserDetailsService;
import dev.serverwizards.examsystem.service.implementation.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final TokenBlacklistService tokenBlacklistService;



    public SecurityConfiguration(JwtTokenProvider tokenProvider
            , CustomUserDetailsService customUserDetailsService, TokenBlacklistService tokenBlacklistService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
        this.tokenBlacklistService = tokenBlacklistService;
    }
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }


    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(Collections.singletonList(authenticationProvider));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(tokenProvider, customUserDetailsService, tokenBlacklistService);

        CorsConfigurationSource corsConfigurationSource = request -> new CorsConfiguration().applyPermitDefaultValues();

       return http
               .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(requests -> requests
                                       .requestMatchers("/").permitAll()
                                .requestMatchers("/api/exams/**").permitAll()
                                .requestMatchers("/api/authenticate/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/user/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/modules/**").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/exam-logs/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/exam-logs/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/**").authenticated()
//                        .requestMatchers(HttpMethod.GET, "/api/exam-logs/{id}").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}




