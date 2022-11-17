package hu.plantshop.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import hu.plantshop.domain.Category;
import hu.plantshop.domain.Product;
import hu.plantshop.dto.response.ProductResponse;
import hu.plantshop.repository.CategoryRepository;
import hu.plantshop.repository.ProductRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;

    private CategoryRepository categoryRepository;

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> response = new ArrayList<>();
        for (Product product : products) {
            List<String> categories = new ArrayList<>();
            List<String> subCategories = new ArrayList<>();
            for (Category categorie : product.getCategory()) {
                if( categorie.getParentId() == null ) {
                    categories.add(categorie.getCategoryName());
                }
                else {
                    subCategories.add(categorie.getCategoryName());
                }
            }
            response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories,  product.getStock(), product.getName(), product.getDescription()));
        }
        return response;
    }


    public List<ProductResponse> getProductsByCategory( String categoryText) {

        List<Product> products = productRepository.getProductsByCategory(categoryRepository.getCategoryByHref(categoryText));
        List<ProductResponse> response = new ArrayList<>();
        for (Product product : products) {
            List<String> categories = new ArrayList<>();
            List<String> subCategories = new ArrayList<>();
            for (Category category : product.getCategory()) {
                if( category.getParentId() == null ) {
                    categories.add(category.getCategoryName());
                }
                else {
                    subCategories.add(category.getCategoryName());
                }
            }
            response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories,  product.getStock(), product.getName(), product.getDescription()));
        }
        return response;
    }
}
