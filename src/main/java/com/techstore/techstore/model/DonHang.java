package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "donhang")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madh")
    private int maDH;

    @Column(name = "mand", nullable = false)
    private int maND;

    @Column(name = "ngaydat", nullable = false, updatable = false, insertable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime ngayDat;

    @Column(name = "trangthai", length = 50, nullable = false)
    private String trangThai = "Chờ";

    @Column(name = "phuongthucthanhtoan", length = 100, nullable = false)
    private String phuongThucThanhToan;

    @Column(name = "madiachi")
    private Integer maDiaChi;
}
