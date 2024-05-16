package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "pass_word")
    private String passWord;
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
    private Gender gender;
    private Role role;
    @Column(name = "is_deleted", columnDefinition = "int default '0'")
    private int isDeleted = 0;


    public User(String userName, String passWord, String email, String firstName, String lastName, String address, String phoneNumber, int isDeleted) {
        this.userName = userName;
        this.passWord = passWord;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.isDeleted = isDeleted;
    }

    public User(String userName) {
        this.userName = userName;
    }

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum Role {
        ROLE_ADMIN, ROLE_USER
    }

}
