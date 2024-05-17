package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.dto.request.CreateCategoryDto;
import nashtech.khanhdu.backend.dto.request.UpdateCategoryDto;
import nashtech.khanhdu.backend.dto.response.CategoryDto;
import nashtech.khanhdu.backend.dto.response.ErrorResponse;
import nashtech.khanhdu.backend.exceptions.CategoryAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.mappers.CategoryMapper;
import nashtech.khanhdu.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;
    private CategoryMapper mapper;

    @Autowired
    public CategoryController(CategoryService categoryService, CategoryMapper mapper) {
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @ExceptionHandler({CategoryNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleCategoryNotFoundException(
        CategoryNotFoundException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("Category not found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler({CategoryAlreadyExistedException.class})
    protected ResponseEntity<ErrorResponse> handleCategoryAlreadyExistedException (
        CategoryAlreadyExistedException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.FOUND.value())
                .message("Category name already existed").build();
        return ResponseEntity.status(HttpStatus.FOUND).body(error);
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDto getCategoryById (@PathVariable("id") Long id) {
        return categoryService.getCategory(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryDto createCategory (@Valid @RequestBody CreateCategoryDto dto) {
        return categoryService.createCategory(dto);
    }

    @PutMapping("/{id}")
    public CategoryDto updateCategory (@PathVariable("id") Long id, @Valid @RequestBody UpdateCategoryDto dto) {
        return categoryService.updateCategory(id, dto);
    }

    @DeleteMapping("/{id}")
    public Category deleteCategory (@PathVariable("id") Long id) {
        return categoryService.deleteCategory(id);
    }

}
