package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;

@Getter
@Setter
@ToString
public class UserProductRatingDto {

//    private User user_name;
//    private Product product_name;
    private int rating;
}
