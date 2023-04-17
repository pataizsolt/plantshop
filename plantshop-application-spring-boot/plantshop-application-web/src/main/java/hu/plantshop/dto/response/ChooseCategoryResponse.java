
package hu.plantshop.dto.response;

import hu.plantshop.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChooseCategoryResponse {
    private List<Category> categoryList;
    private List<Category> subCategoryList;
}
