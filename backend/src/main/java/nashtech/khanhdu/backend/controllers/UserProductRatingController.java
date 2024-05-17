package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.data.entities.UserProductRating;
import nashtech.khanhdu.backend.dto.request.CreateUserProductRatingDto;
import nashtech.khanhdu.backend.services.UserProductRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rating")
public class UserProductRatingController {

    private UserProductRatingService userProductRatingService;

    @Autowired
    public UserProductRatingController(UserProductRatingService userProductRatingService) {
        this.userProductRatingService = userProductRatingService;
    }

    @PostMapping("/{userId}/{productId}")
    public UserProductRating ratingProduct (@PathVariable("userId") Long userId,
                                            @PathVariable("productId") Long productId,
                                            @Valid @RequestBody CreateUserProductRatingDto rating) {
        return userProductRatingService.ratingProduct(userId, productId, rating);
    }

}
