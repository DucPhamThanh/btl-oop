package com.techstore.techstore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.techstore.techstore.service.AuthService;
import com.techstore.techstore.dto.request.AuthenticationRequest;
import com.techstore.techstore.dto.request.LogoutRequest;
import com.techstore.techstore.dto.response.AuthenticationResponse;
import com.techstore.techstore.dto.response.ApiResponse;
import com.techstore.techstore.dto.request.IntrospectRequest;
import com.techstore.techstore.dto.response.IntrospectResponse;
import com.techstore.techstore.model.NguoiDung;
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
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        return authService.introspect(request);
    }

    @PostMapping("/register")
    ApiResponse<NguoiDung> register(@RequestBody NguoiDung user) {
        return authService.register(user);
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) {
        authService.logout(request);
        return ApiResponse.<Void>builder().build();
    }
}
