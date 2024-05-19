package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class CreateProductDto extends AuditEntity<Long> {

    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    @NotNull(message = "Price is required")
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    @NotNull(message = "Quantity is required")
    private int currentQuantity;
    private Set<User> usersFavorite;
    private Set<UserProductRating> productRatings;
    private Set<Category> categories;
    private Set<Order> usersOrder;
}
