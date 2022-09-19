package hu.plantshop;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import hu.plantshop.domain.Role;
import hu.plantshop.domain.User;
import hu.plantshop.service.UserService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {


            userService.saveUser(new User(null, "Example1", "1234", new ArrayList<>()));
            userService.saveUser(new User(null, "Example2", "1234", new ArrayList<>()));
            userService.saveUser(new User(null, "Example3", "1234", new ArrayList<>()));

            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_MANAGER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));

            userService.addRoleToUser("Example1", "ROLE_USER");
            userService.addRoleToUser("Example2", "ROLE_MANAGER");
            userService.addRoleToUser("Example3", "ROLE_ADMIN");
        };
    }
}
