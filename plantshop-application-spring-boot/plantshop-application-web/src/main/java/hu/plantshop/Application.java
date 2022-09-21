package hu.plantshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.security.PasswordEncoder;
import hu.plantshop.service.AppUserService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(AppUserRepository appUserRepository, BCryptPasswordEncoder passwordEncoder) {
        return args -> {
            appUserRepository.save(new AppUser("asd", "asd", "asdasdgg", passwordEncoder.encode("asdasdgg"), AppUserRole.ADMIN));
        };
    }
}
