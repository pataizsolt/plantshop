package hu.plantshop.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AddSubCategory {

    private final String subCategoryName;
    private final Long parentId;

}