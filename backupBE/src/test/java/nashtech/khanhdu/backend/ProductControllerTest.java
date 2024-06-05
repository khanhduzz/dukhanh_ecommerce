package nashtech.khanhdu.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import nashtech.khanhdu.backend.controllers.ProductController;
import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Category;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.exceptions.CategoryNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductAlreadyExistsException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.services.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@MockBean(JpaMetamodelMappingContext.class)
@ContextConfiguration
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    @WithMockUser(roles = "ADMIN")
    public void testCreateProduct_returnOk() throws Exception {
        // Category
        Category category = new Category();
        category.setName("Paper");

        // Create a sample ProductDto
        ProductDto productDto = ProductDto.builder()
                .name("Sample Product")
                .price(10)
                .description("This is a sample product")
                .rating(0)
                .featured(0)
                .image(new ArrayList<>(Collections.singleton("just a image")))
                .categories(new HashSet<>(List.of("p")))
                .build();

        // Create a sample Product to be returned by the service
        Product product = new Product();
        product.setName("Sample Product");
        product.setPrice(10.0);
        product.setDescription("This is a sample product");
        product.setRating(0);
        product.setFeatured(0);
        product.setImage(new ArrayList<>(Collections.singleton("just a image")));
        product.setCategories(new HashSet<>(List.of(new Category("p"))));

        // Mock the productService.createProduct method
        Mockito.when(productService.createProduct(Mockito.any(ProductDto.class)))
                .thenReturn(ResponseEntity.ok(product));

        // Perform the POST request
        mockMvc.perform(MockMvcRequestBuilders.post("/products/create")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Sample Product"))
                .andExpect(jsonPath("$.price").value(10.0))
                .andExpect(jsonPath("$.description").value("This is a sample product"))
                .andExpect(jsonPath("$.rating").value(0))
                .andExpect(jsonPath("$.featured").value(0))
                .andExpect(jsonPath("$.image").value(new ArrayList<>(Collections.singleton("just a image"))));
//                .andExpect(jsonPath("$.categories").value(new HashSet<>(Collections.singleton(new Category("p")))));

        // Verify that the service method was called with the correct parameters
        Mockito.verify(productService, Mockito.times(1)).createProduct(Mockito.any(ProductDto.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenProductDto_whenCreateProduct_returnProductAlreadyExists() throws Exception{
        // given - setup
        ProductDto productDto = ProductDto.builder()
                .name("Sample")
                .build();
        given(productService.createProduct(any(ProductDto.class))).willThrow(ProductAlreadyExistsException.class);

        // when create
        ResultActions response = mockMvc.perform(post("/products/create")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productDto)));

        // return
        response.andDo(print())
                .andExpect(status().isNotAcceptable());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenProductDto_whenCreateProduct_returnCategoryNotFound() throws Exception{
        // given - setup
        ProductDto productDto = ProductDto.builder()
                .name("Sample")
                .categories(new HashSet<>(Collections.singleton("paper")))
                .build();
        given(productService.createProduct(any(ProductDto.class))).willThrow(CategoryNotFoundException.class);

        // when create
        ResultActions response = mockMvc.perform(post("/products/create")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productDto)));

        // return
        response.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testUpdateProduct_successfully() throws Exception {
        Product product = new Product();
        product.setName("Sample");
        ProductDto productDto = ProductDto.builder()
                .name("Sample")
                .price(10)
                .description("Des")
                .rating(0)
                .featured(0)
                .build();
        when(productService.updateProduct(anyLong(), Mockito.any(ProductDto.class))).thenReturn(ResponseEntity.ok(product));

        mockMvc.perform(put("/products/update/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(productDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Sample"));
    }

    @Test
    @WithMockUser
    public void givenProductId_whenGetProduct_returnProductDto() throws Exception {
        // given - setup
        ProductDto productDto = ProductDto.builder()
                .name("Sample")
                .price(10)
                .description("Des")
                .rating(0)
                .featured(0)
                .build();
        given(productService.getProduct(anyLong())).willReturn(productDto);

        // when get by id
        ResultActions response = mockMvc.perform(get("/products/1")
                .with(csrf()));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(productDto.getName()));
    }

    @Test
    @WithMockUser
    public void givenProductId_whenGetProduct_returnException() throws Exception {
        // given - setup
        given(productService.getProduct(anyLong())).willThrow(ProductNotFoundException.class);

        // when get by id
        ResultActions response = mockMvc.perform(get("/products/1")
                .with(csrf()));

        // return
        response.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenProductId_whenDeleteProduct_returnDeleted() throws Exception {
        // given
        given(productService.deleteProduct(anyLong())).willReturn(ResponseEntity.ok().build());

        // when
        ResultActions response = mockMvc.perform(delete("/products/delete/1")
                .with(csrf()));

        // return
        response.andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void givenProductId_whenDeleteProduct_returnProductNotFoundException() throws Exception {
        // given
        given(productService.deleteProduct(anyLong())).willThrow(ProductNotFoundException.class);

        // when
        ResultActions response = mockMvc.perform(delete("/products/delete/1")
                .with(csrf()));

        // return
        response.andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void givenAscendingSearch_whenGetProduct_returnProductAscendingWithId() throws Exception {
        // given
        Page<Product> products = new PageImpl<>(List.of(new Product(), new Product()));
        given(productService.findProducts(any(), any(), any(), any(), any(), any())).willReturn(products);

        // when
        ResultActions response = mockMvc.perform(get("/products")
                .with(csrf())
                .param("page", "0")
                .param("size", "10")
                .param("sort","asc"));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    @WithMockUser
    public void givenDescendingSearch_whenGetProduct_returnProductDescendingWithId() throws Exception {
        // given
        Page<Product> products = new PageImpl<>(List.of(new Product(), new Product()));
        given(productService.findProducts(any(), any(), any(), any(), any(), any())).willReturn(products);

        // when
        ResultActions response = mockMvc.perform(get("/products")
                .with(csrf())
                .param("page", "0")
                .param("size", "10")
                .param("sort","desc"));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }
}
