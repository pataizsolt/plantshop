package hu.plantshop.controller;

import hu.plantshop.domain.BranchCategory;
import hu.plantshop.domain.Category;
import hu.plantshop.dto.request.*;
import hu.plantshop.repository.BranchCategoryRepository;
import hu.plantshop.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import hu.plantshop.dto.response.CategoryResponse;
import hu.plantshop.service.CategoryService;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/store")
@AllArgsConstructor
public class CategoryController {

    private CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final BranchCategoryRepository branchCategoryRepository;

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        CategoryResponse categories = categoryService.getAllCategories();
        if(categories == null) {
            return ResponseEntity.ok("no categories");
        }
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/deletecategory")
    public ResponseEntity<?> deleteCategoryById(@RequestParam Long id) {

        categoryService.deleteBranchCategory(id);

        return ResponseEntity.ok("deleted" + id);
    }

    @PutMapping("/updatecategory")
    public ResponseEntity<?> updateCategoryById(@RequestBody UpdateBranchCategoryRequest update) {

        categoryService.updateBranchCategory(update.getId(), update.getBranchCategoryName());

        return ResponseEntity.ok("updated " + update.getId());
    }

    @Transactional
    @PostMapping("/addBranchCategory")
    public ResponseEntity<?> addBranchCategory(@RequestBody UpdateBranchCategoryRequest add) {

        categoryService.addBranchCategory(add.getBranchCategoryName());

        return ResponseEntity.ok("added " + add.getBranchCategoryName());
    }


    @GetMapping("/maincategories")
    public ResponseEntity<?> getMainCategories(@RequestParam Long id) {
        List<Category> categories = categoryService.getMainCategoriesById(id);
        if(categories == null) {
            return ResponseEntity.ok("no categories");
        }
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/branchcategory")
    public ResponseEntity<?> getBranchCategoryById(@RequestParam Long id) {
        BranchCategory category = categoryService.getBranchCategoryById(id);
        return ResponseEntity.ok(category);
    }


    @Transactional
    @DeleteMapping("/deletemaincategory")
    public ResponseEntity<?> deleteMainCategoryById(@RequestParam Long id) {


        for (int i = 0; i < branchCategoryRepository.findAll().size(); i++) {
            for (int j = 0; j < branchCategoryRepository.findAll().get(i).getMainCategories().size(); j++) {
                if(branchCategoryRepository.findAll().get(i).getMainCategories().get(j).getId() == id){
                    branchCategoryRepository.findAll().get(i).getMainCategories().remove(branchCategoryRepository.findAll().get(i).getMainCategories().get(j));
                }
            }
        }


        categoryService.deleteMainCategory(id);

        return ResponseEntity.ok("deleted" + id);
    }

    @PutMapping("/updatemaincategory")
    public ResponseEntity<?> updateMainCategoryById(@RequestBody UpdateMainCategoryRequest update) {

        categoryService.updateMainCategory(update.getId(), update.getMainCategoryName());

        return ResponseEntity.ok("updated " + update.getId());
    }

    @Transactional
    @PostMapping("/addMainCategory")
    public ResponseEntity<?> addMainCategory(@RequestBody AddMainCategoryToBranchRequest add) {

        categoryService.addMainCategory(add.getId(), add.getMainCategoryName());

        return ResponseEntity.ok("added " + add.getId() + " " + add.getMainCategoryName());
    }


    @Transactional
    @DeleteMapping("/deletesubcategory")
    public ResponseEntity<?> deleteSubCategoryById(@RequestParam Long id) {
        categoryService.deleteSubCategory(id);

        return ResponseEntity.ok("deleted" + id);
    }

    @PutMapping("/updatesubcategory")
    public ResponseEntity<?> updateSubCategoryById(@RequestBody UpdateSubCategoryRequest update) {

        categoryService.updateSubCategory(update.getId(), update.getSubCategoryName());

        return ResponseEntity.ok("updated " + update.getId());
    }

    @Transactional
    @PostMapping("/addSubCategory")
    public ResponseEntity<?> addSubCategory(@RequestBody AddSubCategory add) {

        categoryService.addSubCategory(add.getSubCategoryName(), add.getParentId());

        return ResponseEntity.ok("added " + add.getSubCategoryName() + " " + add.getParentId());
    }



}
