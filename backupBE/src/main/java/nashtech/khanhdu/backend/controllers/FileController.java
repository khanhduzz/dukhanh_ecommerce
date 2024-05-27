package nashtech.khanhdu.backend.controllers;

import nashtech.khanhdu.backend.dto.FileUploadResponse;
import nashtech.khanhdu.backend.services.FileUploadUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileController {
    private final String imagePath;

    public FileController(@Value("${app.image.folder}") String imagePath) {
        this.imagePath = imagePath;
    }

    @PostMapping("/upload")
    ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file")MultipartFile multipartFile)
            throws IOException {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();

        String fileCode = FileUploadUtil.saveFile(imagePath, fileName, multipartFile);

        FileUploadResponse response = new FileUploadResponse(
                  fileName, size, fileCode + "-" + fileName, imagePath + "/" + fileCode + "-" + fileName
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
