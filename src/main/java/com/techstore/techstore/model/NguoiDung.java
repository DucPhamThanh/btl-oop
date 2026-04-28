package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoidung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mand")
    private Integer maND;

    @Column(name = "hoten", length = 100, nullable = false)
    private String hoTen;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "matkhau", length = 255, nullable = false)
    private String matKhau;

    @Column(name = "sodienthoai", length = 15)
    private String soDienThoai;

    @Column(name = "ngaydangky", nullable = false, updatable = false, insertable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime ngayDangKy;

    @Column(name = "mavaitro", length = 10, nullable = false)
    private String maVaiTro;
}
