package hu.plantshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hu.plantshop.domain.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    public Address findAddressById(Long id);
}
