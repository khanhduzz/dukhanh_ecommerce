package nashtech.khanhdu.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@ToString
public class ProductDto {

    private Long id;
    private String name;
    private double price;
    private String description;
    private double rating;
    private int featured;
    private String image;
    private Set<String> categories;
}
