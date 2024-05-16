package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.dto.request.CreateCategoryDto;
import nashtech.khanhdu.backend.dto.request.UpdateCategoryDto;
import nashtech.khanhdu.backend.dto.response.CategoryDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    List<Category> getAllCategories();

    CategoryDto getCategory (Long id);

    CategoryDto createCategory (CreateCategoryDto dto);

    CategoryDto updateCategory (Long id, UpdateCategoryDto dto);

    Category deleteCategory (Long id);

}
