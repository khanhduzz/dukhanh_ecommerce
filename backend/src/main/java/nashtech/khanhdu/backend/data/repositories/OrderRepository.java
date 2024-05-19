package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Order;
import nashtech.khanhdu.backend.data.entities.UserProductRatingId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByUserIdAndProductId (Long userId, Long productId);

    List<Order> findByUserId (Long userId);

}
