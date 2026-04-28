package com.techstore.techstore.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// @FieldDefaults(level = AccessLevel.PRIVATE)
// public class AuthenticationRequest {
//     String email;
//     String matKhau;


// }
public class AuthenticationRequest {

    private String email;
    private String matKhau;

    public AuthenticationRequest() {}

    public AuthenticationRequest(String email, String matKhau) {
        this.email = email;
        this.matKhau = matKhau;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }
}
