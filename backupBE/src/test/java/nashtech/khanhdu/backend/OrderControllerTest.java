package nashtech.khanhdu.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import nashtech.khanhdu.backend.controllers.OrderController;
import nashtech.khanhdu.backend.dto.OrderDto;
import nashtech.khanhdu.backend.entities.Order;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.entities.User;
import nashtech.khanhdu.backend.services.OrderService;
import org.junit.jupiter.api.Test;
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

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
@MockBean(JpaMetamodelMappingContext.class)
@ContextConfiguration
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "USER")
    public void givenValidOrderDto_whenCreateOrUpdateOrder_returnCreatedOrderOk() throws Exception{
        // given
        OrderDto orderDto = new OrderDto(1L, 1L, 5);
        Order order = new Order();
        order.setQuantity(5);

        given(orderService.createOrUpdateOrder(orderDto)).willReturn(ResponseEntity.ok(order));

        // when
        ResultActions response = mockMvc.perform(post("/orders")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderDto)));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(5));
    }

    @Test
    @WithMockUser(roles = "USER")
    public void givenUserId_whenFindAllOrders_returnAllOrders() throws Exception{
        // given
        Long id = 1L;
        Order order1 = new Order();
        Order order2 = new Order();
        List<Order> orders = Arrays.asList(order1, order2);

        given(orderService.findAllByUserId(id)).willReturn(orders);

        // when
        ResultActions response = mockMvc.perform(get("/orders/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON));

        // return
        response.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0]").exists())
                .andExpect(jsonPath("$[1]").exists())
                .andExpect(jsonPath("$[0].user").value(order1.getUser()))
                .andExpect(jsonPath("$[1].user").value(order2.getUser()));
    }
}
