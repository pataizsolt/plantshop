package hu.plantshop.dto.request;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UpdateMainCategoryRequest {

    private final Long id;
    private final String mainCategoryName;

}