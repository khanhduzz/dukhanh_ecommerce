package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.mappers.ProductMapper;
import nashtech.khanhdu.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private ProductMapper mapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
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
}
