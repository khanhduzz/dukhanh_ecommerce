package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;
import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.data.entities.User;

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
    Set<User> usersFavorite;
    Set<Category> categories;

}
