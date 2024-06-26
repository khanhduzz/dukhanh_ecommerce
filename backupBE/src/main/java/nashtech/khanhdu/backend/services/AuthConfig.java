package nashtech.khanhdu.backend.services;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import nashtech.khanhdu.backend.jwt.JwtAuthenticationFilter;
import nashtech.khanhdu.backend.jwt.TokenBlacklistService;
import nashtech.khanhdu.backend.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AuthConfig {

    @Bean
    JwtAuthenticationFilter authFilter (TokenProvider tokenProvider, UserDetailsService userService, TokenBlacklistService tokenBlacklistService) {
        return new JwtAuthenticationFilter(tokenProvider, userService, tokenBlacklistService);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider (UserDetailsService userService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public OpenAPI customizeOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
            .addSecurityItem(new SecurityRequirement()
                                 .addList(securitySchemeName))
            .components(new Components()
                            .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }



    @Bean
    SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity,
                                             JwtAuthenticationFilter authFilter) throws Exception {
        return httpSecurity
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(
                    "/swagger-ui.html"
                    ,"/swagger-ui/**"
                    ,"/api-docs/**"
                    ,"/products/**"
                    ,"/products/page/*"
                    ,"/users/*"
                    ,"/upload/**"
                    ,"/images/**"
                    ,"/products/all/**"
                    ,"/categories/**"
                ).permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/*").permitAll()
                .requestMatchers(HttpMethod.POST ,"api/products/*").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT ,"api/products/*").hasRole("ADMIN")
                .anyRequest().authenticated())
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
//                .logout(logout -> logout.logoutUrl("/auth/signout")
//                        .addLogoutHandler(new SecurityContextLogoutHandler()))
            .build();
    }

    @Bean
    AuthenticationManager authenticationManagerJwt (AuthenticationConfiguration authenticationConfiguration)
        throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder();
    }
}