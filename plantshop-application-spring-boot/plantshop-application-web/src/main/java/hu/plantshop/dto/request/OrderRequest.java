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
    String billingName;
    String deliveryName;
    String email;
    List<OrderItemRequest> items;
    String phoneNumber;
}
