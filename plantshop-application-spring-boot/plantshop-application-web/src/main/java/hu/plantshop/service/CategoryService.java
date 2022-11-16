package hu.plantshop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import hu.plantshop.domain.Category;
import hu.plantshop.dto.response.CategoryContainer;
import hu.plantshop.dto.response.CategoryResponse;
import hu.plantshop.repository.CategoryRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepository categoryRepository;

    public CategoryResponse getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        HashMap<Category, List<Category>> categoriesGrouped =  new HashMap<>();

        for (Category category : categories) {
            if( category.getParentId()==null) {
                categoriesGrouped.put(category, categoryRepository.getCategoriesByParentId(category.getId()));
            }
        }

        List<CategoryContainer> categoryResponse = new ArrayList<>();

        for (Map.Entry<Category, List<Category>> entry : categoriesGrouped.entrySet()) {
            CategoryContainer item = new CategoryContainer(entry.getKey(), entry.getValue());
            categoryResponse.add(item);
        }

        return new CategoryResponse(categoryResponse);
    }

}
