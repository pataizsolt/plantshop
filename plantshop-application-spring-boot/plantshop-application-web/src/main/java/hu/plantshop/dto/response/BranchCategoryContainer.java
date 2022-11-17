package hu.plantshop.dto.response;

    import java.util.List;

    import hu.plantshop.domain.Category;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BranchCategoryContainer {
    String BranchCategoryName;
    List<CategoryContainer> categoryContainers;

}