package nashtech.khanhdu.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.entities.AuditEntity;
import nashtech.khanhdu.backend.entities.Category;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class ProductDto extends AuditEntity<Long> {

    private Long id;
    @NotNull
    private String name;
    @NotNull
    private double price;
    private String description;
    private double rating;
    private int featured;
    private List<String> image;
    private Set<String> categories;
}
