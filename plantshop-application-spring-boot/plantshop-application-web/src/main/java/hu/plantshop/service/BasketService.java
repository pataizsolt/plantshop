package hu.plantshop.service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.Basket;
import hu.plantshop.domain.Product;
import hu.plantshop.repository.BasketRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BasketService {

    private BasketRepository basketRepository;

    private AppUserService appUserService;

    private ProductService productService;

    public Basket getBasketByRequest(HttpServletRequest httpServletRequest) {
        AppUser user;
        try{
            user = appUserService.getUserFromRequest(httpServletRequest);
        }
        catch (Exception e) {
            return null;
        }

        return user.getBasket();
    }

    @Transactional
    public ResponseEntity<?> deleteProductFromBasketById (HttpServletRequest httpServletRequest, Long id) {
        AppUser user;
        try{
            user = appUserService.getUserFromRequest(httpServletRequest);
        }
        catch (Exception e) {
            return null;
        }

        Product removeProduct = productService.getProductById(id);

        for (int i = 0; i < user.getBasket().getProducts().size(); i++) {
            if(user.getBasket().getProducts().get(i).getProduct().equals(removeProduct)){
                user.getBasket().getProducts().remove(user.getBasket().getProducts().get(i));
            }
        }

        return new ResponseEntity<>("Item "+ id + "deleted from user's basket", HttpStatus.OK);
    }
}
