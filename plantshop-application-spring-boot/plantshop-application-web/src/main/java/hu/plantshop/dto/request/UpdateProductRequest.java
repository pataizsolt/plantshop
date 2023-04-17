package hu.plantshop.dto.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UpdateProductRequest {

    private final Long id;
    private final String name;
    private final String description;
    private final Long price;
    private final Long stock;
    private final Long categoryId;
    private final Long subcategoryId;

}
