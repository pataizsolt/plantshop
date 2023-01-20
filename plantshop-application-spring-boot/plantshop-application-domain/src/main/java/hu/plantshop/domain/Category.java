package hu.plantshop.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique=true)
    private String categoryName;

    private String href;
    private Long parentId;

    public Category(String categoryName, Long parentId) {
        this.categoryName = categoryName;
        String href = categoryName.toLowerCase().replaceAll(" ", "-");
        this.href = href;
        this.parentId = parentId;
    }
}
