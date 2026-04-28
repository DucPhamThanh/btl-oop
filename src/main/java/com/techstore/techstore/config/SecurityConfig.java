package com.techstore.techstore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {
            "/api/auth/**",
            "/api/home/**",
            "/api/products/**",
            "/api/categories/**",
            "/api/hello"
    };

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Sử dụng BCryptPasswordEncoder để mã hóa mật khẩu cho user mới.
        // Lưu ý: Các user cũ trong DB đang dùng plain text sẽ không đăng nhập được nữa.
        // Bạn cần update mật khẩu của họ thành chuỗi bcrypt, hoặc tạo tài khoản mới để test.
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        // cấu hình end-point cần bảo vệ
        // 2 end-point là đăng kí và đăng nhập cần được public
        httpSecurity
                .csrf(csrf -> csrf.disable()) // Tắt CSRF (cần thiết cho REST API)
                .authorizeHttpRequests(request -> request
                        // Cho phép các endpoint public
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()
                        // Tất cả các request khác đều cần có token (xác thực)
                        .anyRequest().authenticated());

        httpSecurity.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())));

        return httpSecurity.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(jwtSecret.getBytes(), "HmacSHA512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec).build();
    }
}
