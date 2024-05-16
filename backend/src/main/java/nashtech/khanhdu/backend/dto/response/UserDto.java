package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.User;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UserDto {

    private String userName;
    private String passWord;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private User.Gender gender;
    private User.Role role;
    private int isDeleted;

}
