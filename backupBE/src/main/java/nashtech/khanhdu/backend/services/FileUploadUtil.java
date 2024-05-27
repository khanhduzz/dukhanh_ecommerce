package nashtech.khanhdu.backend.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileUploadUtil {

    public static String saveFile (String path, String fileName, MultipartFile multipartFile)
        throws IOException {
        var uploadPath = Paths.get(path);

        String fileCode = UUID.randomUUID().toString();

        try (var inputStream = multipartFile.getInputStream()) {
            var filePath = uploadPath.resolve(fileCode + "-" + fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save file: " + fileName, ioe);
        }

        return fileCode;
    }
}
