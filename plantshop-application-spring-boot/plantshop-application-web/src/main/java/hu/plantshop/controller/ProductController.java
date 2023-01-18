package hu.plantshop.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import hu.plantshop.dto.request.NewProductRequest;
import hu.plantshop.dto.request.UpdateBranchCategoryRequest;
import hu.plantshop.dto.response.AdminProductResponse;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.Product;
import hu.plantshop.dto.response.ProductResponse;
import hu.plantshop.dto.response.UserInfoResponse;
import hu.plantshop.service.ProductService;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/store")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        if(products.size() == 0) {
            return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(products);
    }


    @GetMapping("/adminproducts")
    public ResponseEntity<?> getAllAdminProducts() {
        List<AdminProductResponse> products = productService.getAllAdminProducts();
        if(products.size() == 0) {
            return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NO_CONTENT);
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
            return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(products);
    }



}
