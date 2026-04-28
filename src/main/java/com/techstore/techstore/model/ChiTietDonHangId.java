package com.techstore.techstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietDonHangId implements Serializable {
    private int maDH;
    private int maSP;
}
