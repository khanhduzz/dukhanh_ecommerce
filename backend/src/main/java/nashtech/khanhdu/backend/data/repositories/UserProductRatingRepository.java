package nashtech.khanhdu.backend.data.repositories;

import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.UserProductRating;
import nashtech.khanhdu.backend.data.entities.UserProductRatingId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserProductRatingRepository extends JpaRepository<UserProductRating, UserProductRatingId> {

//    Set<Product> findByIdProductName (String name);

}
