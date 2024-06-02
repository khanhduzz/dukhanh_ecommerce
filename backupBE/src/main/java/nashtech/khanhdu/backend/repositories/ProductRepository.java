package nashtech.khanhdu.backend.repositories;

import nashtech.khanhdu.backend.entities.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
//    @EntityGraph("Book.category")
//    List<Product> findAll();

    Optional<Product> findByName(String name);

    List<Product> findByNameContaining(String name);

    List<Product> findAllByFeaturedEquals(Integer featured);

    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.name LIKE :name")
    List<Product> findAllByCategoryName(@Param("name") String categoryName);
}
