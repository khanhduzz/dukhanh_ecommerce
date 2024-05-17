package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameLike(String productName);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByIsFeaturedIs(Integer num);

}
