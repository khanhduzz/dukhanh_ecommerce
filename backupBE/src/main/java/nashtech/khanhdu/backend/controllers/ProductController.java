package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.dto.ErrorResponse;
import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.dto.SortedDto;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistsException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000/")
public class ProductController {

    private final ProductService productService;

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

    @ExceptionHandler({ProductAlreadyExistsException.class})
    protected ResponseEntity<ErrorResponse> handleProductAlreadyExistException (
            ProductAlreadyExistsException exception
    ) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_ACCEPTABLE.value())
                .message("Product already exists").build();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(error);
    }

    @ExceptionHandler({CategoryNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleCategoryNotFoundException (
            CategoryNotFoundException exception
    ) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("Category not found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @GetMapping()
    public List<Product> getAllProducts () {
        return productService.getAllProducts();
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct (@Valid @RequestBody ProductDto dto) {
        return productService.createProduct(dto);
    }

    @PutMapping("/update/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId,
                                                    @RequestBody ProductDto dto) {
        return productService.updateProduct(productId, dto);
    }

    @GetMapping("/{productId}")
    public ProductDto getProduct(@PathVariable("productId") Long productId) {
        return productService.getProduct(productId);
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        return productService.deleteProduct(productId);
    }

    @GetMapping("/category/{categoryName}")
    public List<Product> findProductByCategory(@PathVariable("categoryName") String categoryName) {
        return productService.findProductByCategory(categoryName);
    }

    @GetMapping("/search/{productName}")
    public List<Product> findProductByName(@PathVariable("productName") String productName) {
        return productService.findProductByName(productName);
    }

    @GetMapping("/feature")
    public List<Product> findFeaturedProduct() {
        return productService.findFeaturedProduct();
    }

    @GetMapping("/page")
    public Page<Product> getAllProductSortedBy(@RequestBody SortedDto dto) {
        return productService.getAllProductSortedBy(dto);
    }

    @GetMapping("/page/{page}/{number}/{sortedBy}/{direction}")
    public Page<Product> getAllProductsSortedParam(@PathVariable("page") Integer page,
                                                   @PathVariable("number") Integer number,
                                                   @PathVariable("sortedBy") String sortedBy,
                                                   @PathVariable("direction") Integer direction) {
        return productService.getAllProductsSortedParam(page, number, sortedBy, direction);
    }
}
