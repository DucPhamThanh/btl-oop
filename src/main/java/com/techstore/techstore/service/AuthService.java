package com.techstore.techstore.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.techstore.techstore.repository.NguoiDungRepository;
import com.techstore.techstore.model.NguoiDung;
import com.techstore.techstore.dto.request.AuthenticationRequest;

import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jwt.JWTClaimsSet;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.nimbusds.jose.crypto.MACSigner;
import com.techstore.techstore.dto.response.ApiResponse;
import com.techstore.techstore.dto.response.AuthenticationResponse;
import com.techstore.techstore.dto.request.IntrospectRequest;
import com.techstore.techstore.dto.response.IntrospectResponse;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;

import lombok.experimental.NonFinal;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    NguoiDungRepository repo;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.secret}")
    protected String signerKey;

    private String generateToken(String email) {

        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimSet = new JWTClaimsSet.Builder()
                .subject(email)
                .issuer("techstore.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.DAYS).toEpochMilli()))
                .build();

        Payload payload = new Payload(jwtClaimSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(signerKey.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            log.error("Login error", e);
            return null;
        }
    }

    public ApiResponse<IntrospectResponse> introspect(IntrospectRequest request) {
        var token = request.getToken();

        try {
            JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

            SignedJWT signedJWT = SignedJWT.parse(token);

            Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

            var verified = signedJWT.verify(verifier);

            return ApiResponse.<IntrospectResponse>builder()
                    .result(IntrospectResponse.builder()
                            .valid(verified && expiryTime.after(new Date()))
                            .build())
                    .build();

        } catch (Exception e) {
            log.error("Introspect error", e);
            return ApiResponse.<IntrospectResponse>builder()
                    .result(IntrospectResponse.builder()
                            .valid(false)
                            .build())
                    .build();
        }
    }

    public ApiResponse<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        var user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email: " + request.getEmail()));

        boolean authenticated = passwordEncoder.matches(request.getMatKhau(), user.getMatKhau());

        if (!authenticated) {
            throw new RuntimeException("Đăng nhập thất bại!");
        }

        var token = generateToken(request.getEmail());

        var response = AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();

        return ApiResponse.success(response);
    }

    // Generate token
    public ApiResponse<NguoiDung> register(NguoiDung user) {
        // Kiểm tra email đã tồn tại chưa
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ApiResponse.error("Email đã tồn tại!");
        }

        user.setMatKhau(passwordEncoder.encode(user.getMatKhau()));

        user.setMaVaiTro("KH");

        user.setNgayDangKy(LocalDateTime.now());

        NguoiDung savedUser = repo.save(user);
        return ApiResponse.success(savedUser);
    }
}
