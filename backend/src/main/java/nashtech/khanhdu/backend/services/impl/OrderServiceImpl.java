package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.*;
import nashtech.khanhdu.backend.data.repositories.OrderRepository;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.request.CreateOrderDto;
import nashtech.khanhdu.backend.dto.response.OrderDto;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.mappers.OrderMapper;
import nashtech.khanhdu.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper mapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            UserRepository userRepository,
                            ProductRepository productRepository, OrderMapper mapper) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    @Override
    public OrderDto createOrder(Long userId, Long productId, CreateOrderDto dto) {
        Order order = orderRepository.findByUserIdAndProductId(userId, productId);
        if (order == null) {
            order = mapper.toEntity(dto);
        } else {
            order.setQuantity(dto.getQuantity());
        }
        order.setUser(userRepository.findById(userId).orElseThrow(UserNotFoundException::new));
        order.setProduct(productRepository.findById(productId).orElseThrow(ProductNotFoundException::new));
        order = orderRepository.save(order);
        return mapper.toDto(order);
    }

    @Override
    @Transactional
    public void removeOrder(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        orders.forEach(order -> {
            orderRepository.delete(order);
//            order.getUser().getOrders().remove(order);
//            order.getProduct().getUsersOrder().remove(order);
        });
    }
}
