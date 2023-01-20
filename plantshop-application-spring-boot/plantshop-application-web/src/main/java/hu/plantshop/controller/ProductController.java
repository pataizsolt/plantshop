package hu.plantshop.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import hu.plantshop.domain.*;
import hu.plantshop.dto.request.NewProductRequest;
import hu.plantshop.dto.request.UpdateProductRequest;
import hu.plantshop.dto.response.AdminProductResponse;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.BasketItemRepository;
import hu.plantshop.repository.BasketRepository;
import hu.plantshop.repository.OrderItemRepository;
import hu.plantshop.service.BasketService;
import hu.plantshop.service.CategoryService;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import hu.plantshop.dto.response.ProductResponse;
import hu.plantshop.service.ProductService;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/store")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    private CategoryService categoryService;



    @PutMapping("/updateproduct")
    @Transactional
    public ResponseEntity<?> updateProductById(@RequestBody UpdateProductRequest update) {

        productService.updateProductById(update.getId(), update.getName(), update.getDescription(), update.getPrice(), update.getStock(), update.getCategoryId(), update.getSubcategoryId());

        return ResponseEntity.ok("updated " + update.getId());
    }

    @PostMapping("/changeproductavailability")
    @Transactional
    public ResponseEntity<?> deleteProductById(@RequestParam Long id) {
        productService.getProductById(id).setAvailable(!productService.getProductById(id).isAvailable());
        return ResponseEntity.ok("changed" + id);
    }

    @GetMapping("/categoryDTO")
    public ResponseEntity<?> getAllCategoriesInDTO() {
        return ResponseEntity.ok(categoryService.getSubAndMainCategoriesInDTO());
    }


    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        if(products.size() == 0) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(products);
    }


    @GetMapping("/adminproducts")
    public ResponseEntity<?> getAllAdminProducts() {
        List<AdminProductResponse> products = productService.getAllAdminProducts();
        if(products.size() == 0) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(products);
    }

    @Transactional
    @PostMapping("/addproduct")
    public ResponseEntity<?> addBranchCategory(@RequestBody NewProductRequest newProductRequest) {

        productService.addProduct(newProductRequest);

        return ResponseEntity.ok("added " + newProductRequest.getName());
    }

    @GetMapping("/products/{categoryName}")
    @ResponseBody
    public ResponseEntity<?> getProductsByCategoryName(@PathVariable String categoryName) {


        List<ProductResponse> products = productService.getProductsByCategory(categoryName);
        if(products.size() == 0) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(products);
    }



}
