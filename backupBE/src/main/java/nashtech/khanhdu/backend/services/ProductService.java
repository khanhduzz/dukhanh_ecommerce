package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.dto.SortedDto;
import nashtech.khanhdu.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ProductDto getProduct(Long id);

    ResponseEntity<Product> createProduct(ProductDto dto);

    ResponseEntity<Product> updateProduct(Long id, ProductDto dto);

    ResponseEntity<String> deleteProduct(Long id);

    Page<Product> findProducts (String name, Integer feature, Double higherPrice, Double lowerPrice, String category, Pageable pageable) ;

}
