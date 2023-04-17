package hu.plantshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    Product product;
    Long quantity;

    public OrderItem(Product product, Long quantity) {
        this.product = product;
        this.quantity = quantity;
    }
}
