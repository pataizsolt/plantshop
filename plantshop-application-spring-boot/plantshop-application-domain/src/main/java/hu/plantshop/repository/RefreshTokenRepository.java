package hu.plantshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    @Modifying
    int deleteByAppUser(AppUser appUser);

    void deleteRefreshTokenByToken(String token);
}
