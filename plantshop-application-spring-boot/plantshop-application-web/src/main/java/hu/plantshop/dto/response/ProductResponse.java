package hu.plantshop.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private Integer price;
    private List<String> categoryName;
    private List<String> subcategoryName;
    private Integer stock;
    private String name;
    private String description;
}
