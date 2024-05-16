package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;
import nashtech.khanhdu.backend.data.entities.Product;

import java.util.Set;

@Getter
@Setter
@ToString
public class CategoryDto extends AuditEntity<Long> {

    private String name;
    private String description;
    Set<Product> products;

}
