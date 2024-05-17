package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreateUserProductRatingDto {

//    @NotBlank(message = "User is required")
//    private String user_name;
//    @NotBlank(message = "Product name is required")
//    private String product_name;
    @NotNull
    private int rating;

}
