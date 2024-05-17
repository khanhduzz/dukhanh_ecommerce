package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.data.entities.UserProductRating;
import nashtech.khanhdu.backend.dto.request.CreateUserProductRatingDto;
import org.springframework.stereotype.Service;

@Service
public interface UserProductRatingService {

    UserProductRating ratingProduct (Long userId, Long productId, CreateUserProductRatingDto dto);

}
