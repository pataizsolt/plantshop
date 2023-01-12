package hu.plantshop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import hu.plantshop.domain.BranchCategory;
import hu.plantshop.domain.Category;
import hu.plantshop.dto.response.BranchCategoryContainer;
import hu.plantshop.dto.response.CategoryContainer;
import hu.plantshop.dto.response.CategoryResponse;
import hu.plantshop.repository.BranchCategoryRepository;
import hu.plantshop.repository.CategoryRepository;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepository categoryRepository;

    private BranchCategoryRepository branchCategoryRepository;

    public CategoryResponse getAllCategories() {
        List<BranchCategoryContainer> branchCategoryContainers = new ArrayList<>();

        List<BranchCategory> branchCategories = branchCategoryRepository.findAll();

        String branchName;

        List<Category> categories = categoryRepository.findAll();

        for (BranchCategory branchCategory : branchCategories) {
            branchName = branchCategory.getCategoryName();
            List<CategoryContainer> categoryContainer = new ArrayList<>();


            for (Category mainCategory : branchCategory.getMainCategories()) {
                List<Category> subCategories = new ArrayList<>();
                for (Category subCategory : categories) {
                    if(Objects.equals(mainCategory.getId(), subCategory.getParentId())) {
                        subCategories.add(subCategory);
                    }
                }

                categoryContainer.add(new CategoryContainer(mainCategory, subCategories));
            }

            branchCategoryContainers.add(new BranchCategoryContainer(branchCategory.getId(), branchName, categoryContainer));

        }
        return new CategoryResponse(branchCategoryContainers);
    }

    public void deleteBranchCategory(Long id) {
        branchCategoryRepository.deleteById(id);
    }

    @Transactional
    public void updateBranchCategory(Long id, String newBranchName) {
        branchCategoryRepository.findById(id).get().setCategoryName(newBranchName);
    }

    @Transactional
    public void addBranchCategory(String newBranchName) {
        branchCategoryRepository.save(new BranchCategory(newBranchName, null));
    }




    public List<Category> getMainCategoriesById(Long id) {
        BranchCategory branchCategory = branchCategoryRepository.findById(id).get();
        List<Category> mainCategories = branchCategory.getMainCategories();
        return mainCategories;
    }

    public BranchCategory getBranchCategoryById(Long id){
        return branchCategoryRepository.findById(id).get();
    }

    public void deleteMainCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Transactional
    public void updateMainCategory(Long id, String newBranchName) {
        categoryRepository.findById(id).get().setCategoryName(newBranchName);
        categoryRepository.findById(id).get().setHref(newBranchName.toLowerCase().replaceAll(" ", "-"));
        categoryRepository.findById(id).get().setCategoryName(newBranchName);
    }

    @Transactional
    public void addMainCategory(Long id, String newCategoryName) {
        //categoryRepository.save(new Category(newCategoryName, null));
        branchCategoryRepository.findById(id).get().getMainCategories().add(new Category(newCategoryName, null));

    }



    public void deleteSubCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Transactional
    public void updateSubCategory(Long id, String newBranchName) {
        categoryRepository.findById(id).get().setCategoryName(newBranchName);
        categoryRepository.findById(id).get().setHref(newBranchName.toLowerCase().replaceAll(" ", "-"));
        categoryRepository.findById(id).get().setCategoryName(newBranchName);
    }

    @Transactional
    public void addSubCategory(String newCategoryName, Long parentId) {
        //categoryRepository.save(new Category(newCategoryName, null));
        categoryRepository.save(new Category(newCategoryName, parentId));

    }







}
