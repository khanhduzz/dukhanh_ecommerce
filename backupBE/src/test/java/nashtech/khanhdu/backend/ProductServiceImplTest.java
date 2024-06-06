package nashtech.khanhdu.backend;

import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Category;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistsException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.mapper.ProductMapper;
import nashtech.khanhdu.backend.repositories.ProductRepository;
import nashtech.khanhdu.backend.services.*;
import nashtech.khanhdu.backend.services.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private OrderService orderService;

    @Mock
    private RatingService ratingService;


    @Test
    void givenProductId_whenFindById_returnProductDtoSuccess() {
        // given
        Long id = 1L;
        Product product = new Product();
        product.setName("Sample");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .build();

        when(productRepository.findById(id)).thenReturn(Optional.of(product));
        when(productMapper.toDto(product)).thenReturn(dto);

        // when
        ProductDto actualDto = productService.getProduct(id);

        // return
        assertEquals(dto.getName(), actualDto.getName());
        Mockito.verify(productRepository).findById(id);
        Mockito.verify(productMapper).toDto(product);
    }

    @Test
    void givenProductDto_whenCreateProduct_returnProductCreatedSuccess() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();
        Product product = new Product();

        when(productRepository.findByName(dto.getName())).thenReturn(Optional.empty());
        when(categoryService.findByNameEquals(anyString())).thenReturn(category);
        when(productMapper.toEntity(dto)).thenReturn(product);

        // when
        ResponseEntity<Product> response = productService.createProduct(dto);

        // return
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Mockito.verify(productRepository).findByName(dto.getName());
        Mockito.verify(categoryService, times(product.getCategories().size())).findByNameEquals(anyString());
        Mockito.verify(productRepository).save(product);
    }

    @Test
    void givenProductDto_whenCreateProduct_returnProductNameAlreadyExisted() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();

        when(productRepository.findByName(dto.getName())).thenReturn(Optional.of(new Product()));

        // when
        ProductAlreadyExistsException exception = assertThrows(ProductAlreadyExistsException.class, () -> {
            productService.createProduct(dto);
        });

        // return
        assertNotNull(exception);
        Mockito.verify(productRepository).findByName(dto.getName());
    }

    @Test
    void givenProductDto_whenCreateProduct_returnCategoryNotExisted() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();

        when(productRepository.findByName(dto.getName())).thenReturn(Optional.empty());
        when(categoryService.findByNameEquals(anyString())).thenThrow(CategoryNotFoundException.class);

        // when
        CategoryNotFoundException exception = assertThrows(CategoryNotFoundException.class, () -> {
            productService.createProduct(dto);
        });

        // return
        assertNotNull(exception);
        Mockito.verify(productRepository).findByName(dto.getName());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void givenProductDto_whenUpdateProduct_returnProductUpdatedSuccess() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();
        Product product = Product.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton(category)))
                .build();

        // Mock behavior to find the existing product by ID
        when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));
        when(categoryService.findByNameEquals(anyString())).thenReturn(category);
        when(productMapper.updateProduct(product, dto)).thenReturn(product);

        // when
        ResponseEntity<Product> response = productService.updateProduct(1L, dto);

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Mockito.verify(productRepository).findById(1L);
        Mockito.verify(categoryService, times(dto.getCategories().size())).findByNameEquals(anyString());
        Mockito.verify(productRepository).save(product);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void givenProductDto_whenUpdateProduct_returnProductNotFoundException() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();
        Product product = Product.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton(category)))
                .build();

        // Mock behavior to find the existing product by ID
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        // when
        ProductNotFoundException exception = assertThrows(ProductNotFoundException.class, () -> {
            productService.updateProduct(anyLong(), dto);
        });

        // then
        assertNotNull(exception);
        Mockito.verify(productRepository).findById(anyLong());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void givenProductDto_whenUpdateProduct_returnCategoryNotFoundException() {
        // given
        Category category = new Category();
        category.setName("Paper");
        ProductDto dto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("Paper")))
                .build();
        Product product = Product.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton(category)))
                .build();

        // Mock behavior to find the existing product by ID
        when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));
        when(categoryService.findByNameEquals(anyString())).thenThrow(CategoryNotFoundException.class);

        // when
        CategoryNotFoundException exception = assertThrows(CategoryNotFoundException.class, () -> {
            productService.updateProduct(anyLong(), dto);
        });

        // then
        assertNotNull(exception);
        Mockito.verify(productRepository).findById(anyLong());
        Mockito.verify(categoryService, times(dto.getCategories().size())).findByNameEquals(anyString());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void givenProductId_whenDeleteProduct_returnProductDeletedSuccess() throws Exception {
        // given
        Product product = new Product();
        when(productRepository.findById(anyLong())).thenReturn(Optional.of(product));

        // when
        productService.deleteProduct(1L);

        // return
        Mockito.verify(productRepository, times(1)).delete(product);
    }

//    @Test
//    @Disabled
//    public void testFindProducts() {
//
//    }
}
