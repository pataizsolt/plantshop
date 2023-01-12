package hu.plantshop.domain;

import java.util.List;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BranchCategory {
    @Id
    @GeneratedValue
    private Long id;
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Category> mainCategories;

    public BranchCategory(String categoryName, List<Category> mainCategories) {
        this.categoryName = categoryName;
        this.mainCategories = mainCategories;
    }
}
