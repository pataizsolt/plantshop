package hu.plantshop.security.config;

import java.util.Arrays;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import hu.plantshop.security.jwt.AuthEntryPointJwt;
import hu.plantshop.security.jwt.AuthTokenFilter;
import hu.plantshop.security.jwt.JwtUtils;
import hu.plantshop.service.AppUserService;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {

    private AuthEntryPointJwt unauthorizedHandler;

    private AppUserService appUserService;

    private JwtUtils jwtUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {

        http
            .csrf().disable().exceptionHandling()
            .authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy
                (SessionCreationPolicy.STATELESS).and()
            .authorizeRequests()
            .antMatchers("/api/auth/**")
            .permitAll()
            .antMatchers("/api/test/**")
            .permitAll().anyRequest().authenticated();

        http.addFilterBefore(new AuthTokenFilter(jwtUtils, appUserService),
            UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager
        (AuthenticationConfiguration authenticationConfiguration)
        throws Exception {
        return authenticationConfiguration
            .getAuthenticationManager();
    }
}
