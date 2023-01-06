package hu.plantshop.repository;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByAppUser(AppUser appUser);
}
