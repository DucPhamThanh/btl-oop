package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "sanpham")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "masp")
    private int maSP;

    @Column(name = "tensp", length = 200, nullable = false)
    private String tenSP;

    @Lob
    @Column(name = "mota")
    private String moTa;

    @Column(name = "gianhap", nullable = false, precision = 18, scale = 2)
    private BigDecimal giaNhap;

    @Column(name = "giaban", nullable = false, precision = 18, scale = 2)
    private BigDecimal giaBan;

    @Column(name = "soluongton", nullable = false)
    private int soLuongTon = 0;

    @Column(name = "thoigianbaohanh")
    private Integer thoiGianBaoHanh;

    @Column(name = "trangthai", length = 30, nullable = false)
    private String trangThai = "Còn hàng";

    @Column(name = "madm", nullable = false)
    private int maDM;

    @Column(name = "mancc", nullable = false)
    private int maNCC;

    @Column(name = "hinhanh", length = 1000)
    private String hinhAnh;

    @Column(name = "manhinh", length = 200)
    private String manhinh;

    @Column(name = "cpu", length = 200)
    private String cpu;

    @Column(name = "ram", length = 100)
    private String ram;

    @Column(name = "bonho", length = 100)
    private String boNho;

    @Column(name = "camera", length = 200)
    private String camera;

    @Column(name = "pin", length = 100)
    private String pin;

    @Column(name = "hedieuhanh", length = 100)
    private String heDieuHanh;

    @Column(name = "mausac", length = 100)
    private String mauSac;

    @Column(name = "danhgiatrungbinh", precision = 3, scale = 2)
    private BigDecimal danhGiaTrungBinh = BigDecimal.ZERO;

    @Column(name = "soluotdanhgia")
    private Integer soLuotDanhGia = 0;
}
