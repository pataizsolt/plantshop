package hu.plantshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.plantshop.domain.Basket;

public interface BasketRepository extends JpaRepository<Basket, Long> {
}
