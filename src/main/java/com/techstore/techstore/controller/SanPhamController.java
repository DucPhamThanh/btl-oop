package com.techstore.techstore.controller;

import com.techstore.techstore.dto.response.ApiResponse;
import com.techstore.techstore.model.SanPham;
import com.techstore.techstore.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class SanPhamController {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @GetMapping
    public ApiResponse<List<SanPham>> getAllProducts() {
        return ApiResponse.success(sanPhamRepository.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<SanPham> getProduct(@PathVariable int id) {
        return sanPhamRepository.findById(id)
                .map(ApiResponse::success)
                .orElse(ApiResponse.error("Product not found"));
    }
}
