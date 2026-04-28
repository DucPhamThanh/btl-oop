package com.techstore.techstore.service;

import com.techstore.techstore.dto.response.HomePageResponse;
import com.techstore.techstore.repository.DanhMucSPRepository;
import com.techstore.techstore.repository.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    @Autowired
    private DanhMucSPRepository danhMucSPRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public HomePageResponse getHomeData() {
        return HomePageResponse.builder()
                .categories(danhMucSPRepository.findAll())
                .latestProducts(sanPhamRepository.getLatestProducts("Còn hàng"))
                .topRatedProducts(sanPhamRepository.getTopRatedProducts("Còn hàng"))
                .build();
    }
}
