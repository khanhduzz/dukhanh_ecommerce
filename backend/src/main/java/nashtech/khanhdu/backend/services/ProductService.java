package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<Product> getAllProducts();

    ProductDto getProduct (Long id);

    ProductDto createProduct (CreateProductDto dto);

    ProductDto updateProduct (Long id, UpdateProductDto dto);

}
