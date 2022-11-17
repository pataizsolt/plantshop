package hu.plantshop.service;

import org.springframework.stereotype.Service;

import hu.plantshop.repository.BranchCategoryRepository;
import hu.plantshop.repository.CategoryRepository;
import hu.plantshop.repository.ProductRepository;

@Service
public class TestService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private BranchCategoryRepository branchCategoryRepository;

    public void populateData (String branch, String maincat, String subcat, String name, Long price) {


    }
}
