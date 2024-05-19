package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.data.repositories.CategoryRepository;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.exceptions.CategoryAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistedException;
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
    private final UserRepository userRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper mapper,
                              CategoryRepository categoryRepository,
                              UserRepository userRepository) {
        this.productRepository = productRepository;
        this.mapper = mapper;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
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
    @Transactional
    public ProductDto createProduct(CreateProductDto dto) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(dto.getName());
        products.forEach(product -> {
            if (product.getName().equals(dto.getName())) throw new ProductAlreadyExistedException();
        });
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
    public Product deleteProduct (Long id) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
//        product.getUsersFavorite().forEach(user -> {
//            user.getFavoriteProducts().remove(product);
//            userRepository.save(user);
//        });
        productRepository.delete(product);
        return product;
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

    @Override
    public List<Product> findProductByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    @Transactional
    public Set<Product> findProductByCategory(String categoryName) {
        Category category = categoryRepository.findOneByNameIgnoreCase(categoryName);
        if (category == null) throw new ProductNotFoundException();
        return category.getProducts();
    }

    @Override
    public List<Product> findFeatureProduct() {
        return productRepository.findByIsFeaturedIs(1);
    }
}
