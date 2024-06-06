package nashtech.khanhdu.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import nashtech.khanhdu.backend.controllers.CategoryController;
import nashtech.khanhdu.backend.dto.CategoryDto;
import nashtech.khanhdu.backend.entities.Category;
import nashtech.khanhdu.backend.exceptions.CategoryExistedException;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.services.CategoryService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(CategoryController.class)
@MockBean(JpaMetamodelMappingContext.class)
@ContextConfiguration
public class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDto_whenCreateCategory_returnCategoryCreatedOk() throws Exception {
        // given
        CategoryDto categoryDto = new CategoryDto("Category", "des");
        given(categoryService.createCategory(Mockito.any(CategoryDto.class)))
                .willReturn(ResponseEntity.ok(categoryDto));

        // when
        ResultActions response = mockMvc.perform(post("/categories")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(categoryDto)));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Category"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDtoWithNameExisted_whenCreateCategory_returnCategoryExistedException() throws Exception {
        // given
        CategoryDto categoryDto = new CategoryDto("Category", "des");
        given(categoryService.createCategory(Mockito.any(CategoryDto.class)))
                .willThrow(CategoryExistedException.class);

        // when
        ResultActions response = mockMvc.perform(post("/categories")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(categoryDto)));

        // return
        response.andDo(print())
                .andExpect(status().isNotAcceptable());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDto_whenUpdateCategory_returnCategoryUpdatedOk() throws Exception {
        // given
        CategoryDto categoryDto = new CategoryDto("Category update", "des");
        CategoryDto expectedCategoryDto = new CategoryDto("Category update", "des");
        given(categoryService.updateCategory(anyLong(), Mockito.any(CategoryDto.class)))
                .willReturn(ResponseEntity.ok(expectedCategoryDto));

        // when
        ResultActions response = mockMvc.perform(put("/categories/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(categoryDto)));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Category update"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryDto_whenUpdateCategory_returnCategoryNotFoundException() throws Exception {
        // given
        CategoryDto categoryDto = new CategoryDto("Category update", "des");
        CategoryDto expectedCategoryDto = new CategoryDto("Category update", "des");
        given(categoryService.updateCategory(anyLong(), Mockito.any(CategoryDto.class)))
                .willThrow(CategoryNotFoundException.class);

        // when
        ResultActions response = mockMvc.perform(put("/categories/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(categoryDto)));

        // return
        response.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void given_whenFindAllCategory_returnCategories() throws Exception {
        // given
        Category category1 = new Category();
        Category category2 = new Category();
        category1.setName("Category1");
        category2.setName("Category2");
        given(categoryService.findAllCategories()).willReturn(List.of(category1, category2));

        // when
        ResultActions response = mockMvc.perform(get("/categories")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryId_whenDeleteCategory_returnDeletedOk() throws Exception {
        // given
        given(categoryService.deleteCategory(anyLong())).willReturn(ResponseEntity.ok().build());

        // when
        ResultActions response = mockMvc.perform(delete("/categories/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON));

        // return
        response.andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenCategoryIdNotExisted_whenDeleteCategory_returnCategoryNotFoundException() throws Exception {
        // given
        given(categoryService.deleteCategory(anyLong())).willThrow(CategoryNotFoundException.class);

        // when
        ResultActions response = mockMvc.perform(delete("/categories/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON));

        // return
        response.andDo(print())
                .andExpect(status().isNotFound());
    }
}
