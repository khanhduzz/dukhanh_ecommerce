package nashtech.khanhdu.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.entities.AuditEntity;

import java.util.Set;

@Getter
@Setter
@ToString
public class UserDto extends AuditEntity<Long> {

//    private Long id;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String email;
    private String image;
    private String firstName;
    private String lastName;
    private Set<String> roles;
}
