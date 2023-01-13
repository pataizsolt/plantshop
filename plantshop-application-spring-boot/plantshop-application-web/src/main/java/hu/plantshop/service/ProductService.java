package hu.plantshop.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import hu.plantshop.controller.FilesController;
import hu.plantshop.domain.Category;
import hu.plantshop.domain.FileEntity;
import hu.plantshop.domain.Product;
import hu.plantshop.dto.response.FileResponse;
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
            if(product.getPictures()!=null){
                List<FileResponse> images = new ArrayList<>();
                for (FileEntity file : product.getPictures()) {
                    images.add(mapToFileResponse(file));
                }
                response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories, product.getStock(), product.getName(), product.getDescription(), images));
            }
            else{
                response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories, product.getStock(), product.getName(), product.getDescription(), Collections.emptyList()));
            }

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
            if(product.getPictures().size()>0){
                List<FileResponse> images = new ArrayList<>();
                for (FileEntity file : product.getPictures()) {
                    images.add(mapToFileResponse(file));
                }
                response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories, product.getStock(), product.getName(), product.getDescription(), images));
            }
            else{
                response.add(new ProductResponse(product.getId(), product.getPrice(), categories, subCategories, product.getStock(), product.getName(), product.getDescription(), Collections.emptyList()));
            }


        }
        return response;
    }

    public Product getProductById(Long id){
        return productRepository.getProductById(id);
    }

    private FileResponse mapToFileResponse(FileEntity fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/files/")
            .path(fileEntity.getId())
            .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setContentType(fileEntity.getContentType());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);

        return fileResponse;
    }

    public void addProduct() {
        productRepository.save(new Product());
    }
}
