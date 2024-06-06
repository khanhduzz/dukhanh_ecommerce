package nashtech.khanhdu.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.media.DependentSchema;
import nashtech.khanhdu.backend.controllers.UserController;
import nashtech.khanhdu.backend.dto.SignUpDto;
import nashtech.khanhdu.backend.entities.Role;
import nashtech.khanhdu.backend.entities.User;
import nashtech.khanhdu.backend.mapper.UserMapper;
import nashtech.khanhdu.backend.services.UserService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserControllerTest.class)
@MockBean(JpaMetamodelMappingContext.class)
@ContextConfiguration
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private MockMvc mockMvc;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private UserMapper userMapper; // Assuming you use ModelMapper for DTO conversion

    @Test
    @Disabled
    public void testSignup_Success() throws Exception {
        Role role = new Role();
        role.setName("ROLE_USER");
        Set<String> roles = new HashSet<>();
        SignUpDto signUpDto = new SignUpDto("username", "pass", roles, "email@test.com", "Doe", "Ca");
        User savedUser = User.builder()
                .username(signUpDto.username())
                .password("....")
                .roles(new HashSet<>(Collections.singleton(role)))
                .firstName(signUpDto.firstName())
                .lastName(signUpDto.lastName())
                .email(signUpDto.email())
                .build();

        when(userService.signUp(signUpDto)).thenReturn(savedUser);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signUpDto)));

        response.andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        // Optional: Verify response content (if applicable)
        // String responseContent = mvcResult.getResponse().getContentAsString();
        // assertThat(responseContent, containsString("success"));

        verify(userService).signUp(signUpDto);
    }
}
