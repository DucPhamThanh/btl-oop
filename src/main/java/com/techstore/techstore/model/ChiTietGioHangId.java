package com.techstore.techstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietGioHangId implements Serializable {
    private int maGH;
    private int maSP;
}
