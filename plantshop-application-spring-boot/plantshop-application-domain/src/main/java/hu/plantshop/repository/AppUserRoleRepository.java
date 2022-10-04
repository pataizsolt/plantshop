package hu.plantshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.plantshop.domain.AppUserRole;

public interface AppUserRoleRepository extends JpaRepository<AppUserRole, Long> {
    AppUserRole findAppUserRoleByName(String name);
}
