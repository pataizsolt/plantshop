package hu.plantshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.dto.RegistrationRequest;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService{

    private final AppUserService appUserService;
    public String register(RegistrationRequest registrationRequest) {


        return appUserService.signUpUser(
            new AppUser(
                registrationRequest.getFirstName(),
                registrationRequest.getLastName(),
                registrationRequest.getEmail(),
                registrationRequest.getPassword(),
                AppUserRole.USER )
        );
    }
}
