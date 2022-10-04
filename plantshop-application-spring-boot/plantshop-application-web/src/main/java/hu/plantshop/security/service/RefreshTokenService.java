package hu.plantshop.security.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hu.plantshop.domain.RefreshToken;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.repository.RefreshTokenRepository;
import hu.plantshop.security.exception.TokenRefreshException;
import lombok.AllArgsConstructor;

@Service
public class RefreshTokenService {
    @Value("${refreshtoken.expire}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final AppUserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, AppUserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setAppUser(userRepository.findById(userId).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        return refreshTokenRepository.deleteByAppUser(userRepository.findById(userId).get());
    }

    @Transactional
    public void deleteByRefreshToken(String refreshtoken) {
        refreshTokenRepository.deleteRefreshTokenByToken(refreshtoken);
    }
}
