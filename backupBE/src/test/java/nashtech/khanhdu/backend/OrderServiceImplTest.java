package nashtech.khanhdu.backend;

import nashtech.khanhdu.backend.dto.OrderDto;
import nashtech.khanhdu.backend.entities.Order;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.entities.User;
import nashtech.khanhdu.backend.repositories.OrderRepository;
import nashtech.khanhdu.backend.repositories.ProductRepository;
import nashtech.khanhdu.backend.repositories.UserRepository;
import nashtech.khanhdu.backend.services.impl.OrderServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    @WithMockUser(roles = "USER")
    void givenNewOrderDtoWithQuantityHigherZero_whenCreateOrUpdateOrder_thenOrderIsCreated() {
        // given
        OrderDto orderDto = new OrderDto(1L, 1L, 5);
        User user = new User();
        user.setUsername("user");
        Product product = new Product();
        product.setName("product");
        product.setPrice(10.0);

        when(orderRepository.findByUserNameAndProductName(orderDto.userId(), orderDto.productId())).thenReturn(null);
        when(userRepository.findById(orderDto.userId())).thenReturn(Optional.of(user));
        when(productRepository.findById(orderDto.productId())).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenReturn(new Order());

        // when
        ResponseEntity<Order> actual = orderService.createOrUpdateOrder(orderDto);

        // then
        verify(orderRepository, times(1)).save(any(Order.class));
        assertEquals(HttpStatus.OK, actual.getStatusCode());
    }



    @Test
    @WithMockUser(roles = "USER")
    void givenNewOrderDtoWithQuantityEqualsZero_whenCreateOrUpdateOrder_thenOrderIsCreated() throws Exception{
        // given
        OrderDto orderDto = new OrderDto(1L, 1L, 0); // userId, productId, quantity
        Order existingOrder = new Order();

        when(orderRepository.findByUserNameAndProductName(orderDto.userId(), orderDto.productId())).thenReturn(existingOrder);

        // when
        ResponseEntity<Order> response = orderService.createOrUpdateOrder(orderDto);

        // then
        verify(orderRepository, times(1)).delete(existingOrder);
        assertNull(response.getBody());
    }

    @Test
    void givenExistingOrder_whenDeleteOrder_thenOrderIsDeleted() {
        // given
        User user = mock(User.class);
        Product product = mock(Product.class);
        Order order = new Order();
        order.setUserOrder(user);
        order.setProductOrder(product);

        when(orderRepository.findByUserNameAndProductName(user.getId(), product.getId())).thenReturn(order);
        when(user.getOrders()).thenReturn(new HashSet<>());
        when(product.getOrders()).thenReturn(new HashSet<>());

        // when
        ResponseEntity<Order> response = orderService.deleteOrder(order);

        // then
        verify(orderRepository, times(1)).delete(order);
        assertEquals(order, response.getBody());
    }

    @Test
    void givenNonExistingOrder_whenDeleteOrder_thenReturnNull() {
        // given
        User user = mock(User.class);
        Product product = mock(Product.class);
        Order order = new Order();
        order.setUserOrder(user);
        order.setProductOrder(product);

        given(orderRepository.findByUserNameAndProductName(user.getId(), product.getId())).willReturn(null);

        // when
        ResponseEntity<Order> response = orderService.deleteOrder(order);

        // then
        verify(orderRepository, never()).delete(any(Order.class));
        assertNull(response.getBody());
    }

    @Test
    void givenNullOrder_whenDeleteOrder_thenReturnNull() {
        // when
        ResponseEntity<Order> response = orderService.deleteOrder(null);

        // then
        verify(orderRepository, never()).delete(any(Order.class));
        assertNull(response.getBody());
    }

    @Test
    void given_whenFindAllByUserId_thenReturnOrders() {
        // given
        Long userId = 1L;
        Order order1 = new Order();
        Order order2 = new Order();
        List<Order> orderList = Arrays.asList(order1, order2);

        when(orderRepository.findByUserId(userId)).thenReturn(orderList);

        // when
        List<Order> result = orderService.findAllByUserId(userId);

        // then
        assertEquals(orderList, result);
    }
}
