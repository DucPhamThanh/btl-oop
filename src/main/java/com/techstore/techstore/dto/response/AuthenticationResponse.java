package com.techstore.techstore.dto.response;

import lombok.*;
import com.techstore.techstore.model.NguoiDung;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;
    private NguoiDung user;
    boolean authenticated;
}
