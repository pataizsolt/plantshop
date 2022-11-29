package hu.plantshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hu.plantshop.dto.response.CategoryResponse;
import hu.plantshop.service.CategoryService;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/store")
@AllArgsConstructor
public class CategoryController {

    private CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        CategoryResponse categories = categoryService.getAllCategories();
        if(categories == null) {
            return ResponseEntity.ok("no products");
        }
        return ResponseEntity.ok(categories);
    }
}