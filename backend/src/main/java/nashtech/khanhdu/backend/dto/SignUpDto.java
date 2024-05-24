package nashtech.khanhdu.backend.dto;

import java.util.List;

public record SignUpDto(String username, String password, List<String> roles) {
}
