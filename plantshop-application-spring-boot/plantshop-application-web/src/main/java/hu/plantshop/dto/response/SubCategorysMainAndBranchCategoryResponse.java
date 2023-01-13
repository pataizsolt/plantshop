package hu.plantshop.dto.response;

import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class SubCategorysMainAndBranchCategoryResponse {
    private Long branchId;
    private String branchCategoryName;
    private Long mainId;
    private String mainCategoryName;



}
