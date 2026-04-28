package com.techstore.techstore.repository;

import com.techstore.techstore.model.ChiTietGioHang;
import com.techstore.techstore.model.ChiTietGioHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, ChiTietGioHangId> {
}
