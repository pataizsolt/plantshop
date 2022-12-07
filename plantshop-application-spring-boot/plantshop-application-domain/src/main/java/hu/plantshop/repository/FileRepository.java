package hu.plantshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hu.plantshop.domain.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, String> {
    FileEntity findFileEntityById(String id);
}
