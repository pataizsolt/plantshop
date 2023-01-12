package hu.plantshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.plantshop.domain.BranchCategory;
import hu.plantshop.domain.Category;

public interface BranchCategoryRepository extends JpaRepository<BranchCategory, Long> {


}
