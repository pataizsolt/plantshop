package hu.plantshop;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


import javax.persistence.EntityManager;
import javax.transaction.Transactional;

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

import hu.plantshop.domain.Address;
import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.AppUserRole;
import hu.plantshop.domain.BranchCategory;
import hu.plantshop.domain.Category;
import hu.plantshop.domain.FileEntity;
import hu.plantshop.domain.Product;
import hu.plantshop.repository.AddressRepository;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.AppUserRoleRepository;
import hu.plantshop.repository.BranchCategoryRepository;
import hu.plantshop.repository.CategoryRepository;
import hu.plantshop.repository.FileRepository;
import hu.plantshop.repository.ProductRepository;
import hu.plantshop.service.FileService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    @Transactional
    CommandLineRunner run(AppUserRepository appUserRepository, AppUserRoleRepository appUserRoleRepository, AddressRepository addressRepository, CategoryRepository categoryRepository, ProductRepository productRepository, BCryptPasswordEncoder passwordEncoder, BranchCategoryRepository branchCategoryRepository, FileService fileService, FileRepository fileRepository) {
        return args -> {
            appUserRoleRepository.save(new AppUserRole("USER"));
            addressRepository.save(new Address("8319", "Mordor", "mostmarelmegyekedzeni utca", "223"));
            //appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER"))));
            appUserRepository.save(new AppUser("asd", "asd", "asd@asd.com", passwordEncoder.encode("asd123"), Collections.singleton(appUserRoleRepository.findAppUserRoleByName("USER")), addressRepository.findAddressById(2L), addressRepository.findAddressById(2L), "+36302224444"));


            Resource resource = new ClassPathResource("pictures/sample.jpg");

            InputStream input = resource.getInputStream();

            File file = resource.getFile();



            String name = "sample.jpg";
            String contentType = "image/jpg";

            MultipartFile multipartFile = new MockMultipartFile(name,
                file.getName(), contentType, IOUtils.toByteArray(input));

            fileService.save(multipartFile);




            Category mainCategory1 = new Category("Flowering plants", null);
            Category mainCategory2 = new Category("Pet-Friendly plants", null);
            Category mainCategory3 = new Category("Exotic plants", null);
            Category mainCategory4 = new Category("Spooky collection", null);
            Category mainCategory5 = new Category("Vintage planters", null);
            Category mainCategory6 = new Category("Modern pots", null);
            Category mainCategory7 = new Category("Books & Guides", null);
            Category mainCategory8 = new Category("Fertilizers", null);
            Category mainCategory9 = new Category("Soil", null);
            Category mainCategory10 = new Category("Watering tools", null);

            List<Category> mainCategories1 = new ArrayList<>();
            List<Category> mainCategories2 = new ArrayList<>();
            List<Category> mainCategories3 = new ArrayList<>();

            mainCategories1.add(mainCategory1);
            mainCategories1.add(mainCategory2);
            mainCategories1.add(mainCategory3);
            mainCategories2.add(mainCategory4);
            mainCategories2.add(mainCategory5);
            mainCategories2.add(mainCategory6);
            mainCategories3.add(mainCategory7);
            mainCategories3.add(mainCategory8);
            mainCategories3.add(mainCategory9);
            mainCategories3.add(mainCategory10);

            categoryRepository.save(mainCategory1);
            categoryRepository.save(mainCategory2);
            categoryRepository.save(mainCategory3);
            categoryRepository.save(mainCategory4);
            categoryRepository.save(mainCategory5);
            categoryRepository.save(mainCategory6);
            categoryRepository.save(mainCategory7);
            categoryRepository.save(mainCategory8);
            categoryRepository.save(mainCategory9);
            categoryRepository.save(mainCategory10);


            List<Category> subCategories1 = new ArrayList<>();
            List<Category> subCategories2 = new ArrayList<>();
            List<Category> subCategories3 = new ArrayList<>();
            List<Category> subCategories4 = new ArrayList<>();
            List<Category> subCategories5 = new ArrayList<>();
            List<Category> subCategories6 = new ArrayList<>();
            List<Category> subCategories7 = new ArrayList<>();
            List<Category> subCategories8 = new ArrayList<>();
            List<Category> subCategories9 = new ArrayList<>();
            List<Category> subCategories10 = new ArrayList<>();
            List<Category> subCategories11 = new ArrayList<>();



            Category category1 = new Category("tulipan",  mainCategory1.getId());
            Category category2 = new Category("nincs ilyen",  mainCategory2.getId());
            Category category3 = new Category("hmmmm",  mainCategory3.getId());
            Category category4 = new Category("hello kitty",  mainCategory4.getId());
            Category category5 = new Category("pusztulat",  mainCategory5.getId());
            Category category6 = new Category("10/10 modern kocsogok",  mainCategory6.getId());
            Category category7 = new Category("bimbozas 1",  mainCategory7.getId());
            Category category8 = new Category("hogyan neveld a kocsog novenyed part2",  mainCategory7.getId());
            Category category9 = new Category("mutragya",  mainCategory8.getId());
            Category category10 = new Category("guano",  mainCategory8.getId());
            Category category11 = new Category("szar ugymond",  mainCategory8.getId());
            Category category12 = new Category("kokuszhej",  mainCategory9.getId());
            Category category13 = new Category("fold az utcarol",  mainCategory9.getId());
            Category category14 = new Category("Ontozo kanna<3",  mainCategory10.getId());
            Category category15 = new Category("Kancso",  mainCategory10.getId());



            subCategories1.add(category1);
            subCategories1.add(mainCategory1);
            subCategories2.add(category2);
            subCategories2.add(mainCategory2);
            subCategories3.add(category3);
            subCategories3.add(mainCategory4);
            subCategories3.add(category4);
            subCategories4.add(category5);
            subCategories4.add(mainCategory5);
            subCategories4.add(category6);
            subCategories4.add(mainCategory6);
            subCategories5.add(category7);
            subCategories5.add(mainCategory7);
            subCategories6.add(category8);
            subCategories6.add(mainCategory7);
            subCategories7.add(category9);
            subCategories7.add(mainCategory8);
            subCategories8.add(category10);
            subCategories8.add(mainCategory8);
            subCategories9.add(category11);
            subCategories9.add(mainCategory8);
            subCategories9.add(category12);
            subCategories9.add(mainCategory9);
            subCategories10.add(mainCategory9);
            subCategories10.add(category13);
            subCategories11.add(category14);
            subCategories11.add(mainCategory10);
            subCategories11.add(category15);
            subCategories11.add(mainCategory10);



            categoryRepository.save(category1);
            categoryRepository.save(category2);
            categoryRepository.save(category3);
            categoryRepository.save(category4);
            categoryRepository.save(category5);
            categoryRepository.save(category6);
            categoryRepository.save(category7);
            categoryRepository.save(category8);
            categoryRepository.save(category9);
            categoryRepository.save(category10);
            categoryRepository.save(category11);
            categoryRepository.save(category12);
            categoryRepository.save(category13);
            categoryRepository.save(category14);
            categoryRepository.save(category15);

            branchCategoryRepository.save(new BranchCategory("Indoor Plants", mainCategories1));
            branchCategoryRepository.save(new BranchCategory("Pots", mainCategories2));
            branchCategoryRepository.save(new BranchCategory("Accessories", mainCategories3));







            productRepository.save(new Product(100, subCategories1, 10, "product", "productdescription"));
            productRepository.save(new Product(100, subCategories2, 101, "product2", "productdescription2"));
            productRepository.save(new Product(100, subCategories3, 101, "product3", "productdescription2"));
            productRepository.save(new Product(100, subCategories4, 101, "product4", "productdescription2"));
            productRepository.save(new Product(100, subCategories5, 101, "product5", "productdescription2"));
            productRepository.save(new Product(100, subCategories6, 101, "product6", "productdescription2"));
            productRepository.save(new Product(100, subCategories7, 101, "product7", "productdescription2"));
            productRepository.save(new Product(100, subCategories8, 101, "product8", "productdescription2"));
            productRepository.save(new Product(100, subCategories9, 101, "product9", "productdescription2"));
            productRepository.save(new Product(100, subCategories10, 101, "product10", "productdescription2"));
            productRepository.save(new Product(100, subCategories11, 101, "product11", "productdescription2"));












        };


    }
}
