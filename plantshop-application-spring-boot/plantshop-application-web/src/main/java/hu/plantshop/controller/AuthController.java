package hu.plantshop.controller;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.domain.RefreshToken;
import hu.plantshop.dto.request.LoginRequest;
import hu.plantshop.dto.request.RegistrationRequest;
import hu.plantshop.dto.request.TokenRefreshRequest;
import hu.plantshop.dto.response.JwtResponse;
import hu.plantshop.dto.response.MessageResponse;
import hu.plantshop.dto.response.TokenRefreshResponse;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.AppUserRoleRepository;
import hu.plantshop.security.exception.NoRefreshTokenException;
import hu.plantshop.security.exception.TokenRefreshException;
import hu.plantshop.security.jwt.JwtUtils;
import hu.plantshop.security.service.RefreshTokenService;
import lombok.AllArgsConstructor;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    AuthenticationManager authenticationManager;

    AppUserRepository appUserRepository;

    AppUserRoleRepository appUserRoleRepository;

    PasswordEncoder encoder;

    JwtUtils jwtUtils;

    RefreshTokenService refreshTokenService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateuser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AppUser userDetails = (AppUser) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtTokenFromEmail(userDetails.getEmail());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        Cookie cookie = new Cookie("refreshtoken", refreshToken.getToken());
        response.addCookie(cookie);

        return ResponseEntity
            .ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(), userDetails.getEmail(), userDetails.getAppUserRoles()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest, HttpServletResponse response) {
        if (appUserRepository.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        AppUserRole initialRole = appUserRoleRepository.findAppUserRoleByName("USER");
        // Create new user account
        AppUser user = new AppUser(registrationRequest.getFirstName(), registrationRequest.getLastName(), registrationRequest.getEmail(),
            encoder.encode(registrationRequest.getPassword()), Collections.singleton(initialRole));

        appUserRepository.save(user);

        return authenticateuser(new LoginRequest(user.getEmail(), registrationRequest.getPassword()), response);
    }

    @GetMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String requestRefreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshtoken")) {
                    requestRefreshToken = cookie.getValue();
                }
            }
        }

        if(requestRefreshToken == null) {
            throw new NoRefreshTokenException();
        }
        else{
            String finalRequestRefreshToken = requestRefreshToken;
            return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getAppUser)
                .map(user -> {
                    String token = jwtUtils.generateJwtTokenFromEmail(user.getEmail());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, finalRequestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(finalRequestRefreshToken,
                    "Refresh token is not in database!"));
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        AppUser userDetails = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }
}
