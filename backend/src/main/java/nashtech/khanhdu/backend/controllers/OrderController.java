package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.dto.request.CreateOrderDto;
import nashtech.khanhdu.backend.dto.response.OrderDto;
import nashtech.khanhdu.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{userId}/{productId}")
    public OrderDto createOrder (@PathVariable("userId") Long userId,
                                 @PathVariable("productId") Long productId,
                                 @Valid @RequestBody CreateOrderDto dto) {
        return orderService.createOrder(userId, productId, dto);
    }

    @DeleteMapping("/{userId}")
    public void deleteOrder (@PathVariable("userId") Long userId) {
        orderService.removeOrder(userId);
    }
}
