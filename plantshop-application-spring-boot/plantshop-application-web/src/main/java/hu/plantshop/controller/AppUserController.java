package hu.plantshop.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.plantshop.domain.AppUser;
import hu.plantshop.dto.response.MessageResponse;
import hu.plantshop.dto.response.UserInfoResponse;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.security.jwt.JwtUtils;
import hu.plantshop.service.AppUserService;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class AppUserController {

    private AppUserService appUserService;

    private JwtUtils jwtUtils;

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String headerAuth = request.getHeader("Authorization");
        String jwt = null;
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            jwt = headerAuth.substring(7);
        }
        if(!jwtUtils.validateJwtToken(jwt)){
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        AppUser user = appUserService.loadAppUserFromJwt(jwt);
        String s = "";
        return ResponseEntity.ok(new UserInfoResponse(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber() == null ? "-" : user.getPhoneNumber(), user.getDeliveryAddress() == null ? "-" : user.getDeliveryAddress().toString(), user.getBillingAddress() == null ? "-" : user.getBillingAddress().toString()));
    }
}
