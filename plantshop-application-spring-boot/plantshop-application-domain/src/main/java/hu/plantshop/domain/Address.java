package hu.plantshop.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String postalCode;
    private String city;
    private String address;

    private String houseNumber;

    public Address(String postalCode, String city, String address, String houseNumber) {
        this.id = null;
        this.postalCode = postalCode;
        this.city = city;
        this.address = address;
        this.houseNumber = houseNumber;
    }

    @Override
    public String toString() {
        return postalCode + ", " + city + " " + address + " " + houseNumber;
    }
}
