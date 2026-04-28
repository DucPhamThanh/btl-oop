package com.techstore.techstore.repository;

import com.techstore.techstore.model.DanhMucSP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucSPRepository extends JpaRepository<DanhMucSP, Integer> {

    
}
