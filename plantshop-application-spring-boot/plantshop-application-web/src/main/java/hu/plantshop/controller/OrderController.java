package hu.plantshop.controller;

import hu.plantshop.domain.*;
import hu.plantshop.dto.request.LoginRequest;
import hu.plantshop.dto.request.OrderRequest;
import hu.plantshop.repository.AddressRepository;
import hu.plantshop.repository.OrderItemRepository;
import hu.plantshop.repository.OrderRepository;
import hu.plantshop.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {

    private final AddressRepository addressRepository;
    private final AppUserService appUserService;
    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;

    @PostMapping("createOrder")
    @Transactional
    public ResponseEntity<?> orderItems(@RequestBody OrderRequest orderRequest, HttpServletRequest request) throws CredentialNotFoundException {
        Address address = addressRepository.save(new Address(
                orderRequest.getZipcode(),
                orderRequest.getCity(),
                orderRequest.getStreet(),
                orderRequest.getHouseNumber()
        ));

        AppUser user = appUserService.getUserFromRequest(request);

        List<OrderItem> items = new ArrayList<>();



        for (int i = 0; i < user.getBasket().getProducts().size(); i++) {
            items.add(orderItemRepository.save(new OrderItem(user.getBasket().getProducts().get(i).getProduct(), user.getBasket().getProducts().get(i).getQuantity())));
        }

        Order order = new Order(
                orderRequest.getName(),
                orderRequest.getName(),
                orderRequest.getEmail(),
                orderRequest.getPhoneNumber(),
                address,
                address,
                user,
                items
        );

        orderRepository.save(order);
        return ResponseEntity.ok("ok");
    }
}
