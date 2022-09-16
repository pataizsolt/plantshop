package hu.plantshop.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import hu.plantshop.domain.User;
import hu.plantshop.repository.UserRepository;
import hu.plantshop.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
}
