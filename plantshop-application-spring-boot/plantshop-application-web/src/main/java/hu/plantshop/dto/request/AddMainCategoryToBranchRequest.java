package hu.plantshop.dto.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AddMainCategoryToBranchRequest {


        Long id;
        String mainCategoryName;

}