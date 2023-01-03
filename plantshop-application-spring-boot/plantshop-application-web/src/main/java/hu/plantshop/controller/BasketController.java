package hu.plantshop.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import hu.plantshop.domain.BasketItem;
import hu.plantshop.dto.request.ChangeProductQuantityRequest;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

        List<Product> products = new ArrayList<>();

        /*for (BasketItem basketItem : user.getBasket().getProducts()) {
            products.add(basketItem.getProduct());
            if(basketItem.getProduct().equals(product)){
                basketItem.setQuantity(basketItem.getQuantity()+1);
                return ResponseEntity.ok("This product is already in your basket!");
            }
        }*/
        for (int i = 0; i < user.getBasket().getProducts().size(); i++) {
            products.add(user.getBasket().getProducts().get(i).getProduct());
            if(user.getBasket().getProducts().get(i).getProduct().equals(product)){
                user.getBasket().getProducts().get(i).setQuantity(user.getBasket().getProducts().get(i).getQuantity()+1);
                return ResponseEntity.ok("This product is already in your basket!");
            }
        }

        if(!products.contains(product)) {
            user.getBasket().getProducts().add(new BasketItem(null, product, 1L));
        }
        else {
            return ResponseEntity.ok("This product is already in your basket!");
        }



        return ResponseEntity.ok("ok");
    }

    @PostMapping("changeproductquantity")
    @ResponseBody
    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ResponseEntity<?> changeProductQuantity(HttpServletRequest request, @RequestBody ChangeProductQuantityRequest changeProductQuantityRequest) {
        AppUser user;
        try{
            user = appUserService.getUserFromRequest(request);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        Product product = productService.getProductById(changeProductQuantityRequest.getProductId());

        List<Product> products = new ArrayList<>();

        for (int i = 0; i < user.getBasket().getProducts().size(); i++) {
            products.add(user.getBasket().getProducts().get(i).getProduct());
            if(user.getBasket().getProducts().get(i).getProduct().equals(product)){
                user.getBasket().getProducts().get(i).setQuantity(changeProductQuantityRequest.getQuantity());
                return ResponseEntity.ok("This product is already in your basket!");
            }
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
            e.printStackTrace();
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
