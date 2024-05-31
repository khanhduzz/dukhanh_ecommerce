package nashtech.khanhdu.backend.controllers;

import nashtech.khanhdu.backend.dto.FileUploadResponse;
import nashtech.khanhdu.backend.services.FileUploadUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class FileController {
    private final String imagePath;

    public FileController(@Value("${app.image.folder}") String imagePath) {
        this.imagePath = imagePath;
    }

//    @PostMapping("/upload")
//    @PreAuthorize("hasRole('ADMIN')")
//    ResponseEntity<Set<FileUploadResponse>> uploadFile(
//            @RequestParam("file") MultipartFile[] multipartFiles)
//            throws IOException {
//        Set<FileUploadResponse> responses = new HashSet<>();
//        for (MultipartFile multipartFile : multipartFiles) {
//            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
//            long size = multipartFile.getSize();
//
//            String fileCode = FileUploadUtil.saveFile(imagePath, fileName, multipartFile);
//
//            FileUploadResponse response = new FileUploadResponse(
//                    fileName, size, fileCode + "-" + fileName
//            );
//            responses.add(response);
//        }
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Set<String>> uploadFile(
            @RequestParam("file") MultipartFile[] multipartFiles)
            throws IOException {
        Set<String> responses = new HashSet<>();
        for (MultipartFile multipartFile : multipartFiles) {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            long size = multipartFile.getSize();

            String fileCode = FileUploadUtil.saveFile(imagePath, fileName, multipartFile);

            String response = fileCode + "-" + fileName;
            responses.add(response);
        }
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
