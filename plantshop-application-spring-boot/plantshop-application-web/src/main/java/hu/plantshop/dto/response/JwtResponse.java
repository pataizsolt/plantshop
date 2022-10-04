package hu.plantshop.dto.response;

import java.util.List;
import java.util.Set;

import hu.plantshop.domain.AppUserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String accessToken;
    private String refreshToken;

    private String type = "Bearer";
    private Long id;
    private String email;

    private Set<AppUserRole> roles;
    public JwtResponse(String accessToken, String refreshToken, Long id, String email, Set<AppUserRole> roles) {

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        this.roles = roles;

    }
}

