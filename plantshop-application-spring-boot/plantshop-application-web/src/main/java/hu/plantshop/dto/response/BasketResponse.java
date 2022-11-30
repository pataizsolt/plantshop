package hu.plantshop.dto.response;

import java.util.ArrayList;
import java.util.List;

import hu.plantshop.domain.Basket;
import hu.plantshop.domain.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasketResponse {
    Long id;
    List<ProductInBasketResponse> products;
    Long quantity = 0L;
    Long price = 0L;

    public BasketResponse(Basket basket) {
        this.id = basket.getId();
        List<ProductInBasketResponse> productInBasketResponses = new ArrayList<>();
        for (Product product : basket.getProducts()) {
            productInBasketResponses.add(new ProductInBasketResponse(product.getId(), product.getPrice(), product.getStock(), 1, product.getName()));
            this.quantity++;
            this.price += product.getPrice();
        }
        this.products = productInBasketResponses;

    }
}
