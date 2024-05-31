package nashtech.khanhdu.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.entities.AuditEntity;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
public class ProductDto extends AuditEntity<Long> {

//    private Long id;
    private String name;
    private double price;
    private String description;
    private double rating;
    private int featured;
    private List<String> image;
    private Set<String> categories;
}
