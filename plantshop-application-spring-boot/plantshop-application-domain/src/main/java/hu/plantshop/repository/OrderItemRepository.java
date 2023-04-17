package hu.plantshop.repository;

import hu.plantshop.domain.Order;
import hu.plantshop.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    OrderItem findOrderItemById(Long id);

    void deleteOrderItemsByProduct_Id(Long id);


}
