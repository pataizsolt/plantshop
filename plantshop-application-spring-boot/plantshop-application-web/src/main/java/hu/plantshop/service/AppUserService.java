package hu.plantshop.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;

import hu.plantshop.domain.AppUser;
import hu.plantshop.repository.AppUserRepository;
import hu.plantshop.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private JwtUtils jwtUtils;
    private AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByEmail(email)
            .orElseThrow(()
                -> new UsernameNotFoundException
                ("user Not Found with username: " + email));

        return user;
    }

    public AppUser loadAppUserFromJwt(String jwt) {
        String email = jwtUtils.getEmailFromJwtToken(jwt);

        return appUserRepository.findByEmail(email).orElseThrow(()
            -> new UsernameNotFoundException
            ("user Not Found"));
    }
}
