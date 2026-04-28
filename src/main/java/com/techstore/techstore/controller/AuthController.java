package com.techstore.techstore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.techstore.techstore.service.AuthService;
import com.techstore.techstore.dto.request.AuthenticationRequest;
import com.techstore.techstore.dto.response.AuthenticationResponse;
import com.techstore.techstore.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return authService.authenticate(request);
    }

    @PostMapping("/introspect")
    ApiResponse<com.techstore.techstore.dto.response.IntrospectResponse> introspect(@RequestBody com.techstore.techstore.dto.request.IntrospectRequest request) {
        return authService.introspect(request);
    }

    @PostMapping("/register")
    ApiResponse<com.techstore.techstore.model.NguoiDung> register(@RequestBody com.techstore.techstore.model.NguoiDung user) {
        return authService.register(user);
    }

}
