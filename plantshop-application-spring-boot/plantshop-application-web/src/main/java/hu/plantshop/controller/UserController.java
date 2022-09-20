package hu.plantshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import hu.plantshop.service.AppUserService;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private AppUserService appUserService;

}
