package com.techstore.techstore.repository;

import com.techstore.techstore.model.BaoHanh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaoHanhRepository extends JpaRepository<BaoHanh, Integer> {
}
