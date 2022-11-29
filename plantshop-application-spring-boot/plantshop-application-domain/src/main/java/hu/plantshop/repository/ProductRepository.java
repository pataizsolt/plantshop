package hu.plantshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hu.plantshop.domain.Category;
import hu.plantshop.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> getProductsByCategory( Category category );

    Product getProductById(Long id);

}
