package hu.plantshop.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private Integer price;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Subcategory subcategory;
    private Integer stock;
    private String name;
    private String description;

    public Product(Integer price, Category category, Subcategory subcategory, Integer stock, String name, String description) {
        this.price = price;
        this.category = category;
        this.subcategory = subcategory;
        this.stock = stock;
        this.name = name;
        this.description = description;
    }
}
