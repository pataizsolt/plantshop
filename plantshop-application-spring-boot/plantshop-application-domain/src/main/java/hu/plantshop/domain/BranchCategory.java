package hu.plantshop.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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

    @OneToMany
    private List<Category> mainCategories;

    public BranchCategory(String categoryName, List<Category> mainCategories) {
        this.categoryName = categoryName;
        this.mainCategories = mainCategories;
    }
}
