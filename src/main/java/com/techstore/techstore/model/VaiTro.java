package com.techstore.techstore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vaitro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaiTro {
    @Id
    @Column(name = "mavaitro", length = 10, nullable = false)
    private String maVaiTro;

    @Column(name = "tenvaitro", length = 50, nullable = false)
    private String tenVaiTro;
}