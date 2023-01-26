package hu.plantshop.controller;

import hu.plantshop.domain.*;
import hu.plantshop.dto.request.OrderRequest;
import hu.plantshop.dto.response.AdminOrderInfo;
import hu.plantshop.dto.response.OrderInfoResponse;
import hu.plantshop.dto.response.ProductInBasketResponse;
import hu.plantshop.repository.AddressRepository;
import hu.plantshop.repository.OrderItemRepository;
import hu.plantshop.repository.OrderRepository;
import hu.plantshop.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.CredentialNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
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

    @PostMapping("createorder")
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

        appUserService.emptyUserBasket(user);

        return ResponseEntity.ok("ok");
    }


    @GetMapping("listorders")
    @Transactional
    public ResponseEntity<?> listOrders(HttpServletRequest request) throws CredentialNotFoundException {
        try {
            AppUser user = appUserService.getUserFromRequest(request);

            List<OrderInfoResponse> orders = new ArrayList<>();

            List<Order> ordersByAppUser = orderRepository.findOrdersByAppUser(user);

            for (Order order : ordersByAppUser) {
                List<ProductInBasketResponse> items = new ArrayList<>();

                for (OrderItem orderItem : order.getItems()) {
                    items.add(new ProductInBasketResponse(orderItem.getId(), orderItem.getProduct().getPrice(), orderItem.getProduct().getStock(), Math.toIntExact(orderItem.getQuantity()), orderItem.getProduct().getName()));
                }

                orders.add(new OrderInfoResponse(
                        order.getId(),
                        order.getEmail(),
                        order.getDeliveryName(),
                        order.getDate().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm")),
                        order.getPhoneNumber(),
                        order.getDeliveryAddress().toString(),
                        order.isPaid() ? "true" : "false",
                        order.isClosed() ? "true" : "false",
                        order.isShipped() ? "true" : "false",
                        items
                ));
            }

            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }


    }

    @GetMapping("listordersadmin")
    @Transactional
    public ResponseEntity<?> listOrdersAdmin() throws CredentialNotFoundException {
        try {
            Sort sort = Sort.by(Sort.Direction.DESC, "date");

            List<AdminOrderInfo> orders = new ArrayList<>();

            List<Order> ordersAll = orderRepository.findAll(sort);

            for (Order order : ordersAll) {
                List<ProductInBasketResponse> items = new ArrayList<>();

                for (OrderItem orderItem : order.getItems()) {
                    items.add(new ProductInBasketResponse(orderItem.getId(), orderItem.getProduct().getPrice(), orderItem.getProduct().getStock(), Math.toIntExact(orderItem.getQuantity()), orderItem.getProduct().getName()));
                }

                orders.add(new AdminOrderInfo(
                        order.getId(),
                        order.getEmail(),
                        order.getDeliveryName(),
                        order.getDate().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm")),
                        order.getPhoneNumber(),
                        order.getDeliveryAddress().toString(),
                        order.isPaid(),
                        order.isShipped(),
                        order.isClosed(),
                        items
                ));
            }

            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }


    }

    @PostMapping("/changeorderpaid")
    @Transactional
    public ResponseEntity<?> changeOrderPaidById(@RequestParam Long id) {
        orderRepository.findById(id).get().setPaid(!orderRepository.findById(id).get().isPaid());
        return ResponseEntity.ok("changed" + id);
    }

    @PostMapping("/changeorderclosed")
    @Transactional
    public ResponseEntity<?> changeOrderClosedById(@RequestParam Long id) {
        orderRepository.findById(id).get().setClosed(!orderRepository.findById(id).get().isClosed());
        return ResponseEntity.ok("changed" + id);
    }

    @PostMapping("/changeordershipped")
    @Transactional
    public ResponseEntity<?> changeOrderShippedById(@RequestParam Long id) {
        orderRepository.findById(id).get().setShipped(!orderRepository.findById(id).get().isShipped());
        return ResponseEntity.ok("changed" + id);
    }


}
