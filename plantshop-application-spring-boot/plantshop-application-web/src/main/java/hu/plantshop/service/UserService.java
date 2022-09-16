package hu.plantshop.service;


import java.util.List;
import hu.plantshop.domain.Role;
import hu.plantshop.domain.User;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    User getUser(String email);
    void addRoleToUser(String email, String roleName);
    List<User> getUsers();
}
