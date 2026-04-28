package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chitietgiohang")
@IdClass(ChiTietGioHangId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietGioHang {
    @Id
    @Column(name = "magh")
    private int maGH;

    @Id
    @Column(name = "masp")
    private int maSP;

    @Column(name = "soluong", nullable = false)
    private int soLuong = 1;
}
