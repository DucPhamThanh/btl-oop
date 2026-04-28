package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nhacungcap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhaCungCap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mancc")
    private int maNCC;

    @Column(name = "tenncc", length = 200, nullable = false, unique = true)
    private String tenNCC;

    @Column(name = "diachi", length = 500)
    private String diaChi;

    @Column(name = "dienthoai", length = 15)
    private String dienThoai;

    @Column(name = "email", length = 100)
    private String email;
}
