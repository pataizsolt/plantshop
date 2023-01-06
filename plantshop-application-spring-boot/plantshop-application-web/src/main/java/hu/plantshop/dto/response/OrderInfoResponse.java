package hu.plantshop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderInfoResponse {
    private Long id;
    private String email;
    private String name;
    private String date;
    private String phoneNumber;
    private String address;
    private String paid;
    private String closed;
    private List<ProductInBasketResponse> products;
}
