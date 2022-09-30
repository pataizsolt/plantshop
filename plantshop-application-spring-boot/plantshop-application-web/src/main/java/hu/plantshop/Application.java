package hu.plantshop;

import java.util.Collections;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.AppUserRoleRepository;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(AppUserRepository appUserRepository, AppUserRoleRepository appUserRoleRepository, BCryptPasswordEncoder passwordEncoder) {
        return args -> {
            appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER"))));
        };
    }
}
