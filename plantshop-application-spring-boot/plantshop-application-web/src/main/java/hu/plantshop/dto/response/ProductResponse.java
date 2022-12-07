package hu.plantshop.dto.response;

import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private Long id;
    private Integer price;
    private List<String> categoryName;
    private List<String> subcategoryName;
    private Integer stock;
    private String name;
    private String description;
    private List<FileResponse> files;

    public ProductResponse(Long id, Integer price, List<String> categoryName, List<String> subcategoryName, Integer stock, String name, String description, List<FileResponse> files) {
        this.id = id;
        this.price = price;
        this.categoryName = categoryName;
        this.subcategoryName = subcategoryName;
        this.stock = stock;
        this.name = name;
        this.description = description;
        this.files = files;
    }

}
