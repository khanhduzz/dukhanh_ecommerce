package nashtech.khanhdu.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDto {

    private String name;
    private String description;
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    private int currentQuantity;
    private String category;

}
