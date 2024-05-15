package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;
import nashtech.khanhdu.backend.data.entities.User;

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
    private String gender;
    private String role;
    private int isDeleted;

}
