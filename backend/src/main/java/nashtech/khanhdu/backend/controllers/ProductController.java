package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ErrorResponse;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.exceptions.CategoryAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @ExceptionHandler({ProductNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleProductNotFoundException (
            ProductNotFoundException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("Product not found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler({ProductAlreadyExistedException.class})
    protected ResponseEntity<ErrorResponse> handleProductAlreadyExistedException (
            ProductAlreadyExistedException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.FOUND.value())
                .message("Product name is already exists").build();
        return ResponseEntity.status(HttpStatus.FOUND).body(error);
    }

    @ExceptionHandler({CategoryNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleCategoryNotFoundException(
            CategoryNotFoundException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("Category not found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @GetMapping("/{id}")
    public ProductDto getProduct (@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto createProduct (@Valid @RequestBody CreateProductDto dto) {
        return productService.createProduct(dto);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct (@PathVariable("id") Long id, @Valid @RequestBody UpdateProductDto dto) {
        return productService.updateProduct(id, dto);
    }

    @GetMapping
    public List<Product> getProducts () {
        return productService.getAllProducts();
    }

//    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    public Product deleteProduct(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/{productId}/category")
    public Set<Category> getAllCategories (@PathVariable ("productId") Long productId) {
        return productService.getAllCategories(productId);
    }

    @PutMapping("/{productId}/category/{categoryId}")
    public ProductDto addCategory (@PathVariable ("productId") Long productId
            , @PathVariable ("categoryId") Long categoryId) {
        return productService.addCategory(productId, categoryId);
    }

    @GetMapping("/find/{productName}")
    public List<Product> findProductByName (@PathVariable("productName") String productName) {
        return productService.findProductByName(productName);
    }

    @GetMapping("/find/category/{categoryName}")
    public Set<Product> findProductByCategory (@PathVariable("categoryName") String categoryName) {
        return productService.findProductByCategory(categoryName);
    }

    @GetMapping("/featured")
    public List<Product> findFeatureProduct () {
        return productService.findFeatureProduct();
    }
}
