package hu.plantshop.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppUserRole implements GrantedAuthority {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
