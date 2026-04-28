package com.techstore.techstore.repository;

import com.techstore.techstore.model.ChiTietDonHang;
import com.techstore.techstore.model.ChiTietDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, ChiTietDonHangId> {
}
