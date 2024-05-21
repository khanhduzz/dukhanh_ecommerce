package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "ROLES")
@Data
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role {
    @Id
    @Column(name = "ROLE_NAME")
    String roleName;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    Set<User> users;
}
