package hu.plantshop.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Basket {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany
    private List<Product> products;

    private Long quantity;

    private Long price;

    public Basket() {
        this.products = new ArrayList<>();
        this.quantity = (long) 0;
        this.price = 0L;
    }
}
