package hu.plantshop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class UserInfoResponse {
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    String deliveryAddress;
    String billingAdress;
}
