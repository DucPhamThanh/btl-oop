package com.techstore.techstore.repository;

import com.techstore.techstore.model.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    // Sử dụng nativeQuery cho truy vấn sql
    @Query(value = "SELECT * FROM SanPham WHERE TrangThai = ?1 ORDER BY MaSP DESC LIMIT 10", nativeQuery = true)
    List<SanPham> getLatestProducts(String trangThai);

    @Query(value = "SELECT * FROM SanPham WHERE TrangThai = ?1 ORDER BY DanhGiaTrungBinh DESC, SoLuotDanhGia DESC LIMIT 10", nativeQuery = true)
    List<SanPham> getTopRatedProducts(String trangThai);
}
