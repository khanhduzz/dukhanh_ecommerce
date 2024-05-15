package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateProductDto {

    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    @NotBlank(message = "Price is required")
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    @NotBlank(message = "Quantity is required")
    private int currentQuantity;
    private String category;

}
