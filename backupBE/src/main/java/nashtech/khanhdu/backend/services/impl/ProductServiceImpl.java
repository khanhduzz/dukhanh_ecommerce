package nashtech.khanhdu.backend.services.impl;

import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Category;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistsException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.mapper.ProductMapper;
import nashtech.khanhdu.backend.repositories.ProductRepository;
import nashtech.khanhdu.backend.services.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryService categoryService;
    private final OrderService orderService;
    private final RatingService ratingService;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, CategoryService categoryService, OrderService orderService, RatingService ratingService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.categoryService = categoryService;
        this.orderService = orderService;
        this.ratingService = ratingService;
    }

    @Override
    public ProductDto getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);
        ProductDto dto = productMapper.toDto(product);
        dto.setCategories(new HashSet<>());
        product.getCategories().forEach(category -> dto.getCategories().add(category.getName()));
        return dto;
    }

    @Override
    @Transactional
    public ResponseEntity<Product> createProduct(ProductDto dto) {
        if (productRepository.findByName(dto.getName()).isPresent()) {
            throw new ProductAlreadyExistsException();
        }
        Product product = productMapper.toEntity(dto);
        Set<Category> categorySet = new HashSet<>();
        dto.getCategories()
                .forEach(e -> {
                    Category category = categoryService.findByNameEquals(e);
                    if (category == null) throw new CategoryNotFoundException("Category not found");
                    categorySet.add(category);
                });
        product.setCategories(categorySet);
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @Override
    @Transactional
    public ResponseEntity<Product> updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        var updateProduct = productMapper.updateProduct(product, dto);
        Set<Category> categorySet = new HashSet<>();
        dto.getCategories()
                .forEach(e -> {
                    Category category = categoryService.findByNameEquals(e);
                    if (category == null) throw new CategoryNotFoundException("Category not found");
                    categorySet.add(category);
                });
        updateProduct.setCategories(categorySet);
        productRepository.save(updateProduct);
        return ResponseEntity.ok(updateProduct);
    }

    @Override
    @Transactional
    public ResponseEntity<String> deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);
        product.getOrders().forEach(orderService::deleteOrder);
        product.getOrders().clear();
        product.getRatings().forEach(ratingService::deleteRating);
        product.getRatings().clear();
        productRepository.delete(product);
        return ResponseEntity.ok("Delete product successfully");
    }

    @Override
    public Page<Product> findProducts(String name, Integer feature, Double minPrice, Double maxPrice, String category, Pageable pageable) {
        Specification<Product> spec = Specification.where(null);

        if (name != null && !name.isEmpty()) {
            spec = spec.and(ProductSpecifications.hasName(name));
        }
        if (feature != null) {
            spec = spec.and(ProductSpecifications.isFeatured(feature));
        }
        if (minPrice != null) {
            spec = spec.and(ProductSpecifications.hasPriceAbove(minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and(ProductSpecifications.hasPriceBelow(maxPrice));
        }
        if (category != null && !category.isEmpty()) {
            spec = spec.and(ProductSpecifications.hasCategory(category));
        }

        return productRepository.findAll(spec, pageable);
    }
}
