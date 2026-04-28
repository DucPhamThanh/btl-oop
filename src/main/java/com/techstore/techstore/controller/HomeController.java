package com.techstore.techstore.controller;

import com.techstore.techstore.dto.response.ApiResponse;
import com.techstore.techstore.dto.response.HomePageResponse;
import com.techstore.techstore.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping
    public ApiResponse<HomePageResponse> getHomeData() {
        HomePageResponse data = homeService.getHomeData();
        if (data == null) {
            return ApiResponse.error("Home data not found");
        }
        return ApiResponse.success(data);
    }
}
