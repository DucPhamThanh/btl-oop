package com.techstore.techstore.dto.response;

import com.techstore.techstore.model.DanhMucSP;
import com.techstore.techstore.model.SanPham;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomePageResponse {
    private List<DanhMucSP> categories;
    private List<SanPham> latestProducts;
    private List<SanPham> topRatedProducts;
}
