package hu.plantshop.repository;

import hu.plantshop.domain.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BasketItemRepository extends JpaRepository<BasketItem, Long> {

    void deleteBasketItemsByProduct_Id(Long id);


}