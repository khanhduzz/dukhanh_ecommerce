package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category extends AuditEntity<Long>{

    private String name;
    private String description;

}
