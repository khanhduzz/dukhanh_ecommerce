package nashtech.khanhdu.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;
import nashtech.khanhdu.backend.data.entities.User;

@Getter
@Setter
@ToString
public class UpdateUserDto {

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

}
