package nashtech.khanhdu.backend.controllers;

import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

//    @ExceptionHandler({ProductNotFoundException.class})
//    protected ResponseEntity<ErrorResponse> handleProductNotFoundException (
//            ProductNotFoundException exception) {
//
//    }
    @GetMapping("/{id}")
    public ProductDto getProduct (@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }
}
