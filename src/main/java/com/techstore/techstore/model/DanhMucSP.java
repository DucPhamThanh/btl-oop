package com.techstore.techstore.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "danhmucsp")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhMucSP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "madm")
    private int maDM;

    @Column(name = "tendm", length = 100, nullable = false, unique = true)
    private String tenDM;

    @Column(name = "motadm", length = 500)
    private String moTaDM;

    @Column(name = "icon", length = 50)
    private String icon;
}
