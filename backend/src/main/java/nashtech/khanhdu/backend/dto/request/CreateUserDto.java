package nashtech.khanhdu.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import org.json.JSONObject;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class CreateUserDto {

    @NotBlank(message = "Username is required")
    private String userName;
    @NotBlank(message = "Password is required")
    private String passWord;
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
    private User.Role role;
    private int isDeleted;
    private Set<Product> favoriteProducts;

}
