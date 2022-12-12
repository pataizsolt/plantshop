package hu.plantshop.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import hu.plantshop.domain.FileEntity;
import hu.plantshop.dto.response.FileResponse;
import hu.plantshop.service.FileService;
import hu.plantshop.service.ProductService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/files")
@AllArgsConstructor
public class FilesController {

    private final FileService fileService;

    private final ProductService productService;



    @Transactional
    @PostMapping("/add_image_to_product")
    public ResponseEntity<String> uploadToProduct(@RequestParam("file") MultipartFile file, @RequestParam("productId") Long id) {
        try {

            FileEntity image = fileService.save(file);

            productService.getProductById(id).getPictures().add(image);


            return ResponseEntity.status(HttpStatus.OK)
                .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }


    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            fileService.save(file);



            return ResponseEntity.status(HttpStatus.OK)
                .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

    @GetMapping
    public List<FileResponse> list() {
        return fileService.getAllFiles()
            .stream()
            .map(this::mapToFileResponse)
            .collect(Collectors.toList());
    }


    private FileResponse mapToFileResponse(FileEntity fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/files/")
            .path(fileEntity.getId())
            .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setContentType(fileEntity.getContentType());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);

        return fileResponse;
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Optional<FileEntity> fileEntityOptional = fileService.getFile(id);

        if (!fileEntityOptional.isPresent()) {
            return ResponseEntity.notFound()
                .build();
        }

        FileEntity fileEntity = fileEntityOptional.get();
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getName() + "\"")
            .contentType(MediaType.valueOf(fileEntity.getContentType()))
            .body(fileEntity.getData());
    }
}
