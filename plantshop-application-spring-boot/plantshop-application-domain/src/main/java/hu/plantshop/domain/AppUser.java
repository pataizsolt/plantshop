package hu.plantshop.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    private Address deliveryAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    private Address billingAddress;

    private String phoneNumber;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<AppUserRole> appUserRoles;
    private Boolean locked = false;
    private Boolean enabled = true;

    @OneToOne(cascade = CascadeType.ALL)
    private Basket basket;

    @OneToMany
    private List<Order> orders;

    public AppUser(String firstName, String lastName, String email, String password, Set<AppUserRole> appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRoles = appUserRole;
        this.basket = new Basket();

    }

    public AppUser(String firstName, String lastName, String email, String password, Set<AppUserRole> appUserRoles, Address deliveryAddress, Address billingAddress, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.deliveryAddress = deliveryAddress;
        this.billingAddress = billingAddress;
        this.phoneNumber = phoneNumber;
        this.appUserRoles = appUserRoles;
        this.basket = new Basket();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();

        for (AppUserRole role : appUserRoles) {
            list.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        return list;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

