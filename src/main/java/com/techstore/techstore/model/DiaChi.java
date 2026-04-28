package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "diachi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madiachi")
    private int maDiaChi;

    @Column(name = "mand", nullable = false)
    private int maND;

    @Column(name = "diachi", length = 500, nullable = false)
    private String diaChi;

    @Column(name = "loaidiachi", length = 50, nullable = false)
    private String loaiDiaChi = "Địa chỉ nhà";

    @Column(name = "macdinh", nullable = false)
    private boolean macDinh = false;
}
