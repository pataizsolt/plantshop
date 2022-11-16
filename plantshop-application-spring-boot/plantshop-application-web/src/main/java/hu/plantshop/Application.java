package hu.plantshop;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import hu.plantshop.domain.Address;
import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.domain.Category;
import hu.plantshop.domain.Product;
import hu.plantshop.repository.AddressRepository;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.AppUserRoleRepository;
import hu.plantshop.repository.CategoryRepository;
import hu.plantshop.repository.ProductRepository;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner run(AppUserRepository appUserRepository, AppUserRoleRepository appUserRoleRepository, AddressRepository addressRepository, CategoryRepository categoryRepository, ProductRepository productRepository, BCryptPasswordEncoder passwordEncoder) {
        return args -> {
            appUserRoleRepository.save(new AppUserRole("USER"));
            addressRepository.save(new Address("8319", "Mordor", "mostmarelmegyekedzeni utca", "223"));
            //appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER"))));
            appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER")), addressRepository.findAddressById(2L), addressRepository.findAddressById(2L), "+36302224444"));
            Category mainCategory1 = new Category("Category1", "category1", null);
            categoryRepository.save(mainCategory1);
            categoryRepository.save(new Category("Category2",  "category2", null));
            List<Category> categories = new ArrayList<>();
            Category category1 = new Category("SubCategory1", "scategory1",  4L);
            Category category2 = new Category("SubCategory2", "scategory2",  4L);
            categories.add(category1);
            categories.add(category2);
            categories.add(mainCategory1);
            categoryRepository.save(category1);
            categoryRepository.save(category2);
            productRepository.save(new Product(100, categories, 10, "product", "productdescription"));
            productRepository.save(new Product(100, categories, 101, "product2", "productdescription2"));
            productRepository.save(new Product(100, categories, 101, "product3", "productdescription2"));
            productRepository.save(new Product(100, categories, 101, "product4", "productdescription2"));
            productRepository.save(new Product(100, categories, 101, "product5", "productdescription2"));
            productRepository.save(new Product(100, categories, 101, "product6", "productdescription2"));



        };
    }
}
