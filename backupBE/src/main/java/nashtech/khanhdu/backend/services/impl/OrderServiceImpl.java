package nashtech.khanhdu.backend.services.impl;

import nashtech.khanhdu.backend.dto.OrderDto;
import nashtech.khanhdu.backend.entities.Order;
import nashtech.khanhdu.backend.exceptions.OrderNotFoundException;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.exceptions.UserExistException;
import nashtech.khanhdu.backend.repositories.OrderRepository;
import nashtech.khanhdu.backend.repositories.ProductRepository;
import nashtech.khanhdu.backend.repositories.UserRepository;
import nashtech.khanhdu.backend.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;

        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<Order> createOrUpdateOrder(OrderDto dto) {
        Order order = orderRepository.findByUserNameAndProductName(dto.userId(), dto.productId());
        if (dto.quantity() <= 0) {
            orderRepository.delete(order);
            return ResponseEntity.ok(null);
        }
        if (order == null) {
            order = new Order();
            order.setUserOrder(userRepository
                    .findById(dto.userId())
                    .orElseThrow(() -> new UserExistException("User not found")));
            order.setProductOrder(productRepository
                    .findById(dto.productId())
                    .orElseThrow(ProductNotFoundException::new));
        }
        order.setQuantity(dto.quantity());
        order.setUser(order.getUserOrder().getUsername());
        order.setProduct(order.getProductOrder().getName());
        order.setPrice(order.getProductOrder().getPrice());
        order.setProdId(order.getProductOrder().getId());
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @Override
    public ResponseEntity<Order> deleteOrder(Order order) {
        if (order == null) return ResponseEntity.ok(null);
        Order o = orderRepository.findByUserNameAndProductName(
                order.getUserOrder().getId(), order.getProductOrder().getId());
        if (o == null) return ResponseEntity.ok(null);
        order.getUserOrder().getOrders().remove(order);
        order.getProductOrder().getOrders().remove(order);
        orderRepository.delete(order);
        return ResponseEntity.ok(order);
    }

    @Override
    public List<Order> findAllByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
