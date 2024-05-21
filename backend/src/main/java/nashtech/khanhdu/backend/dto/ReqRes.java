package nashtech.khanhdu.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import lombok.Data;
import nashtech.khanhdu.backend.data.entities.User;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String userName;
    private String passWord;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private List<User> users;

}
