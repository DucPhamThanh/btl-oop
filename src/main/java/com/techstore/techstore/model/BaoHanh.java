package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "baohanh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaoHanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mabh")
    private int maBH;

    @Column(name = "masp", nullable = false)
    private int maSP;

    @Column(name = "thoigianbaohanh", nullable = false)
    private int thoiGianBaoHanh;

    @Column(name = "motabh", length = 500)
    private String moTaBH;

    @Column(name = "ngaybatdau")
    private LocalDate ngayBatDau;

    @Column(name = "ngayketthuc")
    private LocalDate ngayKetThuc;
}
