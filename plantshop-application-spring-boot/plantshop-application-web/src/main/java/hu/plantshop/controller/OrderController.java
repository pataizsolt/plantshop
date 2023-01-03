package hu.plantshop.controller;

import hu.plantshop.domain.AppUser;
import hu.plantshop.domain.Product;
import hu.plantshop.dto.request.LoginRequest;
import hu.plantshop.dto.request.OrderRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/order")
@AllArgsConstructor
public class OrderController {
    @PostMapping("createOrder")
    @Transactional
    public ResponseEntity<?> getCartSummary(@RequestBody OrderRequest orderRequest, HttpServletRequest request) {

        return ResponseEntity.ok("ok");
    }
}
