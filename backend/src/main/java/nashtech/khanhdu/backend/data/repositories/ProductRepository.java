package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
