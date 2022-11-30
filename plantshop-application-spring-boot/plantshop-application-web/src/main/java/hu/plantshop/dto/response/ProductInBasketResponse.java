package hu.plantshop.dto.response;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import hu.plantshop.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductInBasketResponse {
    private Long id;
    private Integer price;
    private Integer stock;
    private Integer quantity;
    private String name;
}
