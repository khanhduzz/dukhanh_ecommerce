package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
