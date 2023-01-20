package hu.plantshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.plantshop.domain.Basket;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
}
