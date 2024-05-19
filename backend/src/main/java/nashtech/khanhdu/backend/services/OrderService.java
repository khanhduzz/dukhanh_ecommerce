package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.dto.request.CreateOrderDto;
import nashtech.khanhdu.backend.dto.response.OrderDto;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {

    OrderDto createOrder (Long userId, Long productId, CreateOrderDto dto);

    void removeOrder (Long userId);

}
