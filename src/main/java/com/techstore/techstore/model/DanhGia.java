package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "danhgia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madg")
    private int maDG;

    @Column(name = "masp", nullable = false)
    private int maSP;

    @Column(name = "mand", nullable = false)
    private int maND;

    @Column(name = "madh")
    private Integer maDH;

    @Column(name = "sosao", nullable = false)
    private int soSao;

    @Lob
    @Column(name = "noidung")
    private String noiDung;

    @Column(name = "ngaydanhgia", nullable = false, updatable = false, insertable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime ngayDanhGia;

    @Column(name = "daxacthuc", nullable = false)
    private boolean daXacThuc = false;
}
