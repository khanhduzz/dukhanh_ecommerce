package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users_rating_products")
public class UserProductRating{

    @EmbeddedId
    private UserProductRatingId userProductRatingId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
//    @MapsId("userName")
//    @JoinColumn(name = "user_name")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
//    @MapsId("productName")
//    @JoinColumn(name = "product_name")
    private Product product;

    private int rating;

    public UserProductRating(User user, Product product, int rating) {
        this.user = user;
        this.product = product;
        this.rating = rating;
    }
}
