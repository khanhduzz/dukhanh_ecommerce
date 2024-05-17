package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ProductService {

    List<Product> getAllProducts();

    ProductDto getProduct (Long id);

    ProductDto createProduct (CreateProductDto dto);

    ProductDto updateProduct (Long id, UpdateProductDto dto);

    Product deleteProduct (Long id);

    ProductDto addCategory (Long id, Long categoryId);

    Set<Category> getAllCategories (Long id);

    List<Product> findProductByName (String name);

    Set<Product> findProductByCategory (String categoryName);

    List<Product> findFeatureProduct();

}
