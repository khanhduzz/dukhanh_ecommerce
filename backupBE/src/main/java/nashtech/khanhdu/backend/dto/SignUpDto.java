package nashtech.khanhdu.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.Set;

@Builder
public record SignUpDto(String username, String password, Set<String> roles, @NotNull String email, String firstName, String lastName) {
}
