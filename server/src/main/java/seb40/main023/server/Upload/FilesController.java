package seb40.main023.server.Upload;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/Files")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class FilesController {
    private final FilesService filesService;


    @PostMapping
    public String uploadFile(@RequestPart(value="file",required = false) MultipartFile files) throws IOException{
        Files file = new Files();

        String sourceFileName = files.getOriginalFilename();

        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();

        FilenameUtils.removeExtension(sourceFileName);

        File destinationFile;
        String destinationFileName;
        String fileUrl = "C:/Users/saypart/Repository/seb40_main_023/server/src/main/resources";

        do{
          destinationFileName = RandomStringUtils.randomAlphanumeric(32)+"."+sourceFileNameExtension;
          destinationFile = new File(fileUrl+destinationFileName);
        }while (destinationFile.exists());

        destinationFile.getParentFile().mkdirs();
        files.transferTo(destinationFile);

        file.setFilename(destinationFileName);
        file.setFileOriName(sourceFileName);
        file.setFileUrl(fileUrl);
        filesService.save(file);

        return "redirect:/upload";
    }

}
