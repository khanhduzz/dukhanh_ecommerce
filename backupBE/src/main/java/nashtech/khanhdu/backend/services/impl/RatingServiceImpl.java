package nashtech.khanhdu.backend.services.impl;

import nashtech.khanhdu.backend.dto.RatingDto;
import nashtech.khanhdu.backend.entities.Product;
import nashtech.khanhdu.backend.entities.Rating;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.exceptions.UserExistException;
import nashtech.khanhdu.backend.repositories.ProductRepository;
import nashtech.khanhdu.backend.repositories.RatingRepository;
import nashtech.khanhdu.backend.repositories.UserRepository;
import nashtech.khanhdu.backend.services.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public RatingServiceImpl(RatingRepository ratingRepository,
                             UserRepository userRepository,
                             ProductRepository productRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<Rating> createOrUpdateRating(RatingDto dto) {
        Rating rating = ratingRepository.findByUserNameAndProductName(dto.userId(), dto.productId());
        if (rating == null) {
            rating = new Rating();
            rating.setUserRating(
                userRepository.findById(dto.userId())
                    .orElseThrow(() -> new UserExistException("User not found")));
            rating.setProductRating(
                    productRepository.findById(dto.productId())
                        .orElseThrow(ProductNotFoundException::new));
            rating.setRate(dto.rate());
            rating.setUser(rating.getUserRating().getUsername());
            rating.setProduct(rating.getProductRating().getName());
            Product product = rating.getProductRating();
            double newRate = (product.getRating() + dto.rate()) / (product.getRatings().size() + 1);
            product.setRating(newRate);
            productRepository.save(product);
            ratingRepository.save(rating);
            return ResponseEntity.ok(rating);
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<Rating> deleteRating(Rating rating) {
        ratingRepository.delete(rating);
        return ResponseEntity.ok(rating);
    }
}
