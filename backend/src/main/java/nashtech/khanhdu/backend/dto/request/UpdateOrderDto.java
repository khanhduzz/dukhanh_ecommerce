package nashtech.khanhdu.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateOrderDto {

    @NotNull
    private int quantity;

}
