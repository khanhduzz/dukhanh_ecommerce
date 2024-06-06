package nashtech.khanhdu.backend;

import nashtech.khanhdu.backend.dto.CategoryDto;
import nashtech.khanhdu.backend.entities.Category;
import nashtech.khanhdu.backend.exceptions.CategoryExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.repositories.CategoryRepository;
import nashtech.khanhdu.backend.services.CategoryService;
import nashtech.khanhdu.backend.services.ProductService;
import nashtech.khanhdu.backend.services.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    public void given_whenFindAll_returnCategoriesOk() {
        // given
        Category category1 = new Category();
        Category category2 = new Category();
        category1.setName("Category1");
        category2.setName("Category2");
        List<Category> categories = Arrays.asList(category1,category2);
        when(categoryRepository.findAll()).thenReturn(categories);

        // when
        List<Category> actualCategories = categoryService.findAllCategories();

        // return
        assertEquals(2, actualCategories.size());
        assertEquals("Category1", actualCategories.get(0).getName());
        assertEquals("Category2", actualCategories.get(1).getName());
    }

    @Test
    public void givenCategoryName_whenFindByName_returnCategoryOk() {
        // given
        Category category1 = new Category();
        category1.setName("Category1");
        when(categoryRepository.findByNameEquals("Category1")).thenReturn(category1);

        // when
        Category actualCategory = categoryService.findByNameEquals("Category1");

        // return
        assertEquals("Category1", actualCategory.getName());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDto_whenCreateCategory_returnCategoryCreatedOk() {
        // given
        CategoryDto categoryDto = new CategoryDto("Category", "Des");
        when(categoryRepository.findByNameEquals(categoryDto.name())).thenReturn(null);

        // when
        ResponseEntity<CategoryDto> actual = categoryService.createCategory(categoryDto);

        // return
        assertEquals(ResponseEntity.ok(categoryDto), actual);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDto_whenCreateCategory_returnCategoryExistedException() {
        // given
        CategoryDto categoryDto = new CategoryDto("Category", "Des");
        when(categoryRepository.findByNameEquals(categoryDto.name())).thenThrow(CategoryExistedException.class);

        // when
        CategoryExistedException actual = assertThrows(CategoryExistedException.class, () -> {
            categoryService.createCategory(categoryDto);
        });

        // return
        assertNotNull(actual);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryId_whenDeleteCategory_returnDeletedOk() {
        // given
        Long id = 1L;
        Category category = new Category();
        category.setId(id);
        category.setProducts(new HashSet<>());
        when(categoryRepository.findById(id)).thenReturn(Optional.of(category));

        // when
        ResponseEntity<String> actual = categoryService.deleteCategory(id);

        // return
        assertEquals(ResponseEntity.ok("Delete successfully"), actual);
        verify(categoryRepository, times(1)).delete(category);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryIdNotExisted_whenDeleteCategory_returnCategoryNotFoundException() {
        // given
        Long id = 1L;
        when(categoryRepository.findById(id)).thenThrow(CategoryNotFoundException.class);

        // when
        CategoryNotFoundException actual = assertThrows(CategoryNotFoundException.class, () -> {
            categoryService.deleteCategory(id);
        });

        // return
        assertNotNull(actual);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDtoAndId_whenUpdateCategory_returnCategoryUpdatedOk() {
        // given
        Long id = 1L;
        Category category = new Category();
        CategoryDto categoryDto = new CategoryDto("Category update", "Des update");
        when(categoryRepository.findById(id)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        // when
        ResponseEntity<CategoryDto> actual = categoryService.updateCategory(id, categoryDto);

        // return
        assertEquals(ResponseEntity.ok(categoryDto), actual);
        assertEquals(Objects.requireNonNull(actual.getBody()).name(), categoryDto.name());
        Mockito.verify(categoryRepository, times(1)).save(category);
    }
}
