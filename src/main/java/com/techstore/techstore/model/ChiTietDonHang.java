package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "chitietdonhang")
@IdClass(ChiTietDonHangId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietDonHang {
    @Id
    @Column(name = "madh")
    private int maDH;

    @Id
    @Column(name = "masp")
    private int maSP;

    @Column(name = "soluong", nullable = false)
    private int soLuong;

    @Column(name = "dongia", nullable = false, precision = 18, scale = 2)
    private BigDecimal donGia;

    @Column(name = "thanhtien", precision = 18, scale = 2, insertable = false, updatable = false)
    private BigDecimal thanhTien;

    @Column(name = "mausac", length = 50)
    private String mauSac;

    @Column(name = "dungluong", length = 50)
    private String dungLuong;
}
