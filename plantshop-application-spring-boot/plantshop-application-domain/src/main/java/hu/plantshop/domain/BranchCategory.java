package hu.plantshop.domain;

import java.util.List;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BranchCategory {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique=true)
    private String categoryName;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Category> mainCategories;

    public BranchCategory(String categoryName, List<Category> mainCategories) {
        this.categoryName = categoryName;
        this.mainCategories = mainCategories;
    }
}
