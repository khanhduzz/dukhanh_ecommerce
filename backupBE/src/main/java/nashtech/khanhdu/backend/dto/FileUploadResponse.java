package nashtech.khanhdu.backend.dto;

public record FileUploadResponse(String fileName, Long size, String download, String url) {
}
