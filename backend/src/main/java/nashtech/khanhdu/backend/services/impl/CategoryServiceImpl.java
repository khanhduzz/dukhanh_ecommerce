package nashtech.khanhdu.backend.services.impl;

import jakarta.persistence.Access;
import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.repositories.CategoryRepository;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.dto.request.CreateCategoryDto;
import nashtech.khanhdu.backend.dto.request.UpdateCategoryDto;
import nashtech.khanhdu.backend.dto.response.CategoryDto;
import nashtech.khanhdu.backend.exceptions.CategoryAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.mappers.CategoryMapper;
import nashtech.khanhdu.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private CategoryMapper mapper;
    private final ProductRepository productRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper mapper,
                               ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
        this.productRepository = productRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryDto getCategory(Long id) {
        return categoryRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(CategoryNotFoundException::new);
    }

    @Override
    @Transactional
    public CategoryDto createCategory(CreateCategoryDto dto) {
        List<Category> categories = categoryRepository.findByNameLike(dto.getName());
        categories.forEach(category -> {
            if (category.getName().equals(dto.getName())) throw new CategoryAlreadyExistedException();
        });
        Category category = mapper.toEntity(dto);
        category = categoryRepository.save(category);
        return mapper.toDto(category);
    }

    @Override
    @Transactional
    public CategoryDto updateCategory(Long id, UpdateCategoryDto dto) {
        return categoryRepository.findById(id)
                .map(category -> {
                    var updateCategory = mapper.updateEntity(category, dto);
                    updateCategory = categoryRepository.save(category);
                    return mapper.toDto(updateCategory);
                }).orElseThrow(CategoryNotFoundException::new);
    }

    @Override
    @Transactional
    public Category deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        category.getProducts().forEach(product -> {
            product.getCategories().remove(category);
        });
        categoryRepository.delete(category);
        return category;
    }
}
