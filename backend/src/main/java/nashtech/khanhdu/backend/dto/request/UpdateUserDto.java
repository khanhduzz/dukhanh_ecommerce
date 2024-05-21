package nashtech.khanhdu.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class UpdateUserDto extends AuditEntity<Long>{

    @NotBlank(message = "Username is required")
    private String username;
    @NotBlank(message = "Password is required")
    private String password;
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    private String address;
    private String phoneNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private User.Gender gender;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Set<String> role;
    private int isDeleted;
    private Set<String> productRatings;
    private Set<String> favoriteProducts;
    private Set<String> orders;
}
