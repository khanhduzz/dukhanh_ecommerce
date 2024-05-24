package nashtech.khanhdu.backend.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
//@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "users")
public class User extends AuditEntity<Long> implements UserDetails {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
    @Column(name = "user_name")
    private String username;
    @Column(name = "pass_word")
    private String password;
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
    private Gender gender;
    @Column(name = "is_deleted", columnDefinition = "int default '0'")
    private int isDeleted = 0;

    @ManyToMany(fetch = FetchType.EAGER)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(
            name = "USERS_ROLES",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_NAME"))
    Set<Role> roles;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany(mappedBy = "usersFavorite")
    Set<Product> favoriteProducts;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    Set<UserProductRating> productRatings;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    Set<Order> orders;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities () {
        if ( this.roles != null ) {
            return this.roles.stream().map(e -> new SimpleGrantedAuthority(e.getRoleName())).toList();
        }
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
