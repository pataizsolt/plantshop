package hu.plantshop.dto.response;

import java.util.ArrayList;
import java.util.List;

import hu.plantshop.domain.Basket;
import hu.plantshop.domain.BasketItem;
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
        for (BasketItem product : basket.getProducts()) {
            productInBasketResponses.add(new ProductInBasketResponse(product.getProduct().getId(), product.getProduct().getPrice(), product.getProduct().getStock(), product.getQuantity().intValue(), product.getProduct().getName()));
            this.quantity += product.getQuantity();
            this.price += product.getProduct().getPrice();
        }
        this.products = productInBasketResponses;

    }
}
