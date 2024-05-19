package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class ProductDto extends AuditEntity<Long> {

    private String name;
    private String description;
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    private int currentQuantity;
    private Set<UserProductRating> productRatings;
    private Set<User> usersFavorite;
    private Set<Category> categories;
    private Set<Order> usersOrder;

}
