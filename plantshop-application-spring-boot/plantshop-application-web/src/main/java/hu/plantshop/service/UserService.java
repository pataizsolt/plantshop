package hu.plantshop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.plantshop.domain.User;
import hu.plantshop.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers(){
        userRepository.save(new User("asd", "fasasdasd"));
        List<User> users = new ArrayList<>();
        users.addAll(userRepository.findAll());
        return users;
    }
}
