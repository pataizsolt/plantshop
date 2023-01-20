package hu.plantshop.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orderofuser")
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    LocalDateTime date;
    private String billingName;
    private String deliveryName;
    private String email;
    private String phoneNumber;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address deliveryAddress;
    @ManyToOne(cascade = CascadeType.ALL)
    private Address billingAddress;
    @ManyToOne(cascade = CascadeType.ALL)
    private AppUser appUser;
    @OneToMany
    private List<OrderItem> items;

    private boolean paid;

    private boolean closed;

    public Order(String billingName, String deliveryName, String email, String phoneNumber, Address deliveryAddress, Address billingAddress, AppUser appUser, List<OrderItem> items) {
        this.date = LocalDateTime.now();
        this.billingName = billingName;
        this.deliveryName = deliveryName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.deliveryAddress = deliveryAddress;
        this.billingAddress = billingAddress;
        this.appUser = appUser;
        this.items = items;
        this.closed = false;
        this.paid = false;
    }
}




