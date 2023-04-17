package hu.plantshop;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import hu.plantshop.domain.*;
import hu.plantshop.repository.*;
import hu.plantshop.service.AppUserService;
import hu.plantshop.service.CategoryService;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import hu.plantshop.service.FileService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    @PersistenceContext
    EntityManager entityManager;
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean

    CommandLineRunner run(AppUserRepository appUserRepository, AppUserRoleRepository appUserRoleRepository, AddressRepository addressRepository, CategoryRepository categoryRepository, ProductRepository productRepository, BCryptPasswordEncoder passwordEncoder, BranchCategoryRepository branchCategoryRepository, FileService fileService, OrderRepository orderRepository, OrderItemRepository orderItemRepository, CategoryService categoryService) {
        return args -> {
            if(appUserRepository.findAll().size()==0){
                appUserRoleRepository.save(new AppUserRole("USER"));
                appUserRoleRepository.save(new AppUserRole("ADMIN"));
                Address address = new Address("8319", "Mordor", "Sample street", "111");
                addressRepository.save(address);
                //appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER"))));
                AppUser user = new AppUser("admin", "admin", "admin@admin.com", passwordEncoder.encode("admin123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("ADMIN")), addressRepository.findAddressById(2L), addressRepository.findAddressById(2L), "+36302224444");
                appUserRepository.save(user);

            }
        };




    }
}
