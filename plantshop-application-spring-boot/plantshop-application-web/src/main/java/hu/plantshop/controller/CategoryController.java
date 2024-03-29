package hu.plantshop.controller;

import hu.plantshop.domain.BranchCategory;
import hu.plantshop.domain.Category;
import hu.plantshop.dto.request.*;
import hu.plantshop.dto.response.SubCategorysMainAndBranchCategoryResponse;
import hu.plantshop.exception.NotUniqueNameException;
import hu.plantshop.repository.BranchCategoryRepository;
import hu.plantshop.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import hu.plantshop.dto.response.CategoryResponse;
import hu.plantshop.service.CategoryService;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
    @Transactional
    public ResponseEntity<?> deleteCategoryById(@RequestParam Long id) {

        for (Category category : categoryService.getBranchCategoryById(id).getMainCategories()) {
            categoryService.deleteMainCategory(category.getId());
        }
        //categoryService.getBranchCategoryById(id).setMainCategories(new ArrayList<>());
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
    public ResponseEntity<?> addBranchCategory(@RequestBody UpdateBranchCategoryRequest add) throws NotUniqueNameException {

        try{
            categoryService.addBranchCategory(add.getBranchCategoryName());
            return ResponseEntity.ok("added " + add.getBranchCategoryName());
        }
        catch (Exception e){
            throw new NotUniqueNameException("same name as previous category");
        }

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

    @GetMapping("/subcategories")
    public ResponseEntity<?> getSubCategoriesByMainCategoryId(@RequestParam Long id) {
        List<Category> categories = categoryService.getSubCategoriesByMainId(id);
        return ResponseEntity.ok(categories);
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

        categoryService.deleteSubCategoriesWithMainId(id);


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


    @GetMapping("/branchandmaindata")
    public ResponseEntity<?> getBranchAndMainCategoryDataByMainCategoryId(@RequestParam Long id) {
        String branchName = null;
        Long branchId = null;
        String mainName = categoryRepository.findById(id).get().getCategoryName();
        Long mainId = id;

        for (int i = 0; i < branchCategoryRepository.findAll().size(); i++) {
            for (int j = 0; j < branchCategoryRepository.findAll().get(i).getMainCategories().size(); j++) {
                if(branchCategoryRepository.findAll().get(i).getMainCategories().get(j).getId() == id){
                    branchName = branchCategoryRepository.findAll().get(i).getCategoryName();
                    branchId = branchCategoryRepository.findAll().get(i).getId();
                }
            }
        }
        try{
            SubCategorysMainAndBranchCategoryResponse response = new SubCategorysMainAndBranchCategoryResponse(branchId, branchName, mainId, mainName);
            return ResponseEntity.ok(response);
        }
        catch (Exception e){
            return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.BAD_REQUEST);
        }
    }
}
