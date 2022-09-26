package hu.plantshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.dto.request.LoginRequest;
import hu.plantshop.dto.request.RegistrationRequest;
import hu.plantshop.dto.response.JwtResponse;
import hu.plantshop.dto.response.MessageResponse;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    AuthenticationManager authenticationManager;

    AppUserRepository appUserRepository;

    PasswordEncoder encoder;

    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateuser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        AppUser userDetails = (AppUser) authentication.getPrincipal();

        return ResponseEntity
            .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        if (appUserRepository.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        AppUser user = new AppUser(registrationRequest.getFirstName(), registrationRequest.getLastName(), registrationRequest.getEmail(),
            encoder.encode(registrationRequest.getPassword()), AppUserRole.USER);

        appUserRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("user registered successfully!"));
    }
}
