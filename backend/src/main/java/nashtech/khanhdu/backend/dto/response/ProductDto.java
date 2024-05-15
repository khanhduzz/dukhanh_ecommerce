package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;

@Getter
@Setter
@ToString
public class ProductDto extends AuditEntity<Long> {

    private String name;
    private String description;
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    private int currentQuantity;
    private String category;

}
