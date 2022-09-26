package hu.plantshop.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import hu.plantshop.domain.AppUser;
import hu.plantshop.repository.AppUserRepository;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AppUserService implements UserDetailsService {
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
}
