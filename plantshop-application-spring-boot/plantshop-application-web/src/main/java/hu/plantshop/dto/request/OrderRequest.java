package hu.plantshop.dto.request;

import hu.plantshop.domain.OrderItem;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class OrderRequest {
    String name;
    String email;
    String phoneNumber;
    String city;
    String street;
    String houseNumber;
    String zipcode;
}
