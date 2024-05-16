package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import nashtech.khanhdu.backend.data.entities.AuditEntity;

@Getter
@Setter
@ToString
public class UpdateCategoryDto extends AuditEntity<Long> {

    @NotBlank(message = "Category name is required")
    private String name;
    private String description;

}
