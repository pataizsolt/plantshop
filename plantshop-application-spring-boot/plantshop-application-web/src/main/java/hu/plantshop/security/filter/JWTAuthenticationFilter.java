package hu.plantshop.security.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import hu.plantshop.security.jwt.JWTTokenHandler;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private UserDetailsService userDetailsService;
    private JWTTokenHandler jwtTokenHandler;

    public JWTAuthenticationFilter(UserDetailsService userDetailsService,JWTTokenHandler jwtTokenHandler) {
        this.userDetailsService=userDetailsService;
        this.jwtTokenHandler = jwtTokenHandler;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {


        String authToken= jwtTokenHandler.getToken(request);

        if(null!=authToken) {

            String userName= jwtTokenHandler.getUsernameFromToken(authToken);

            if(null!=userName) {

                UserDetails userDetails=userDetailsService.loadUserByUsername(userName);

                if(jwtTokenHandler.validateToken(authToken, userDetails)) {

                    UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);



                }

            }

        }

        filterChain.doFilter(request, response);



    }

}

