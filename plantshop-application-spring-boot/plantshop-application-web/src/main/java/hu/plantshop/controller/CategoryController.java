package hu.plantshop.controller;

import hu.plantshop.dto.request.SimpleIdRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
            return ResponseEntity.ok("no categories");
        }
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/deletecategory")
    public ResponseEntity<?> deleteCategoryById(@RequestBody SimpleIdRequest id) {

        categoryService.deleteBranchCategory(id.getId());

        return ResponseEntity.ok("deleted" + id.getId());
    }




}
