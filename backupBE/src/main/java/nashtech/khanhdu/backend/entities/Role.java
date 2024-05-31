package nashtech.khanhdu.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "ROLES")
public class Role {

    @Id
    @Column(name = "ROLE_NAME")
    String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @ToString.Exclude
    Set<User> users;
}
