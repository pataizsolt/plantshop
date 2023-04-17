package hu.plantshop.dto.response;

import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminProductResponse {
    private Long id;
    private Integer price;
    private String categoryName;
    private Long categoryId;
    private String subcategoryName;
    private Long subcategoryId;
    private Integer stock;
    private String name;
    private String description;
    private List<FileResponse> files;

    private boolean available;

    public AdminProductResponse(Long id, Integer price, String categoryName, Long categoryId, String subcategoryName, Long subcategoryId, Integer stock, String name, String description, List<FileResponse> files, boolean available) {
        this.id = id;
        this.price = price;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.subcategoryName = subcategoryName;
        this.subcategoryId = subcategoryId;
        this.stock = stock;
        this.name = name;
        this.description = description;
        this.files = files;
        this.available=available;
    }
}
