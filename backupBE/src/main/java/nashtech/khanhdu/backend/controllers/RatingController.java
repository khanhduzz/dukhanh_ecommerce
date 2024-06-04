package nashtech.khanhdu.backend.controllers;

import nashtech.khanhdu.backend.dto.RatingDto;
import nashtech.khanhdu.backend.entities.Rating;
import nashtech.khanhdu.backend.services.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
@CrossOrigin(origins = "http://localhost:3000/")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Rating> createOrUpdateRating(@RequestBody RatingDto dto) {
        return ratingService.createOrUpdateRating(dto);
    }
}
