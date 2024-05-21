package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class UserDto extends AuditEntity<Long> {

    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private User.Gender gender;
    private Set<Role> role;
    private int isDeleted;
    private Set<UserProductRating> productRatings;
    private Set<Product> favoriteProducts;
    private Set<Order> orders;
}
