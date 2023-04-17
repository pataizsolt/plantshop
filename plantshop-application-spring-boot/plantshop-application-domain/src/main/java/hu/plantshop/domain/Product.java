package hu.plantshop.domain;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.engine.internal.Cascade;

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
    @ManyToMany
    private List<Category> category;
    private Integer stock;
    private String name;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FileEntity> pictures;

    private boolean available;
    public Product(Integer price, List<Category> category, Integer stock, String name, String description) {
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.name = name;
        this.description = description;
        this.available=true;
    }
    public Product(Integer price, List<Category> category, Integer stock, String name, String description, List<FileEntity> pictures) {
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.name = name;
        this.description = description;
        this.pictures = pictures;
        this.available=true;
    }
}
