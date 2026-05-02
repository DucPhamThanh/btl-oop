package com.techstore.techstore.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogoutRequest {
    private String token;
}
