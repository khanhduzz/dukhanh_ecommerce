package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByNameLike (String name);

    Category findOneByNameIgnoreCase (String name);

    List<Category> findByNameContainingIgnoreCase (String name);

}
