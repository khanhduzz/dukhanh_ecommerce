package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import lombok.Setter;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.data.entities.UserProductRating;
import nashtech.khanhdu.backend.data.entities.UserProductRatingId;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.data.repositories.UserProductRatingRepository;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.request.CreateUserProductRatingDto;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.exceptions.RatingException;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.services.UserProductRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProductRatingImpl implements UserProductRatingService {

    private UserProductRatingRepository userProductRatingRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public UserProductRatingImpl(UserProductRatingRepository userProductRatingRepository,
                                 UserRepository userRepository,
                                 ProductRepository productRepository) {
        this.userProductRatingRepository = userProductRatingRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public UserProductRating ratingProduct(Long userId, Long productId, CreateUserProductRatingDto dto) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Product product = productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
        UserProductRating userProductRating = new UserProductRating();
        UserProductRatingId id = new UserProductRatingId();
        id.setUserName(user.getUserName());
        id.setProductName(product.getName());
        userProductRating.setUserProductRatingId(id);
        userProductRating.setUser(user);
        userProductRating.setProduct(product);
        userProductRating.setRating(dto.getRating());
        userProductRatingRepository.save(userProductRating);
        return userProductRating;
    }
}
