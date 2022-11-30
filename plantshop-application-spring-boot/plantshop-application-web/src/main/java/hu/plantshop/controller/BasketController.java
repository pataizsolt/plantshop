package hu.plantshop.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.Basket;
import hu.plantshop.domain.Product;
import hu.plantshop.dto.response.BasketResponse;
import hu.plantshop.dto.response.ProductResponse;
import hu.plantshop.service.AppUserService;
import hu.plantshop.service.BasketService;
import hu.plantshop.service.ProductService;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/store")
@AllArgsConstructor
public class BasketController {

    private AppUserService appUserService;

    private ProductService productService;

    private BasketService basketService;

    @PostMapping("addtobasket/{id}")
    @ResponseBody
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> getProductsByCategoryName(HttpServletRequest request, @PathVariable Long id) {
        AppUser user;
        try{
            user = appUserService.getUserFromRequest(request);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Product product = productService.getProductById(id);

        if(!user.getBasket().getProducts().contains(product)) {
            user.getBasket().getProducts().add(product);
        }
        else {
            return ResponseEntity.ok("This product is already in your basket!");
        }



        return ResponseEntity.ok("ok");
    }

    @GetMapping("getbasket")
    @ResponseBody
    public ResponseEntity<?> getProductsByCategoryName(HttpServletRequest request) {
        try{
            Basket basket = basketService.getBasketByRequest(request);
            return ResponseEntity.ok(new BasketResponse(basket));
        }
        catch (Exception e) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("deleteItem/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteProductFromUsersBasket(HttpServletRequest request, @PathVariable Long id) {
        try{
            return basketService.deleteProductFromBasketById(request, id);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}
