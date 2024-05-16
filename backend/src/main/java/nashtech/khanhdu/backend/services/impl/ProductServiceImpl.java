package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.repositories.CategoryRepository;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.mappers.ProductMapper;
import nashtech.khanhdu.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private ProductMapper mapper;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper mapper,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.mapper = mapper;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ProductDto getProduct(Long id) {
        return productRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(ProductNotFoundException::new);
    }

    @Override
    public ProductDto createProduct(CreateProductDto dto) {
        Product product = mapper.toEntity(dto);
        product = productRepository.save(product);
        return mapper.toDto(product);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, UpdateProductDto dto) {
        return productRepository.findById(id)
                .map(product -> {
                    var updateProduct = mapper.updateEntity(product, dto);
                    updateProduct = productRepository.save(updateProduct);
                    return mapper.toDto(updateProduct);
                }).orElseThrow(ProductNotFoundException::new);
    }

    @Override
    @Transactional
    public Product deleteProduct (Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return product;
                }).orElseThrow(ProductNotFoundException::new);
    }

    @Override
    @Transactional
    public ProductDto addCategory(Long id, Long categoryId) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        Category category = categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        product.getCategories().add(category);
        product = productRepository.save(product);
        return mapper.toDto(product);
    }

    @Override
    @Transactional
    public Set<Category> getAllCategories(Long id) {
        return productRepository.findById(id)
                .map(Product::getCategories)
                .orElseThrow(ProductNotFoundException::new);
    }
}
