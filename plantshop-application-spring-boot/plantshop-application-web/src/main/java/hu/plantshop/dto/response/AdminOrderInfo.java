package hu.plantshop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AdminOrderInfo {
    private Long id;
    private String email;
    private String name;
    private String date;
    private String phoneNumber;
    private String address;
    private boolean paid;
    private boolean shipped;
    private boolean closed;
    private List<ProductInBasketResponse> products;
}
