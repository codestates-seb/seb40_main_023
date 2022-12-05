package seb40.main023.server.Upload.controller;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seb40.main023.server.Upload.mapper.UpFileMapper;
import seb40.main023.server.Upload.service.UpFileService;
import seb40.main023.server.Upload.entity.UpFile;
import seb40.main023.server.member.service.MemberService;

import javax.validation.constraints.Positive;
import java.io.*;

@RestController
@RequestMapping("/Files")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class UpFileController {
    private final UpFileService upFileService;
    private final UpFileMapper upFileMapper;
    private final MemberService memberService;

    @PostMapping
    public String uploadFile(@Positive @RequestParam("memberId") long memberId, @RequestPart(value="file",required = false) MultipartFile files) throws IOException{
//    public String uploadFile(@PathVariable("member-id") long memberId, @RequestPart(value="file",required = false) MultipartFile files, @RequestBody UpFilePostDto upFilePostDto) throws IOException{
        UpFile upfile = new UpFile();

        String sourceFileName = files.getOriginalFilename();

        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();

        FilenameUtils.removeExtension(sourceFileName);

        File destinationFile;
        String destinationFileName;
        String fileUrl = "C:/Users/saypart/Repository/seb40_main_023/server/src/main/resources/login/"; // 파일 다운로드 경로
//        String fileUrl = "/home/ubuntu/seb40_main_023/server/src/main/resources/";
//        String fileUrl = "/home/ubuntu/upload/";
        do{
          destinationFileName = RandomStringUtils.randomAlphanumeric(32)+"."+sourceFileNameExtension; //파일명 수정 파일명 중복을 피하기 위한 랜덤네임 설정
          destinationFile = new File(fileUrl+destinationFileName); //기존 url에 파일명 추가
        }while (destinationFile.exists());

        destinationFile.getParentFile().mkdirs();
        files.transferTo(destinationFile);

        upfile.setUpFilename(destinationFileName);
        upfile.setUpFileOriName(sourceFileName);
        upfile.setUpFileUrl(fileUrl);
        upfile.setSubMemberId(memberId);
        upFileService.save(upfile);

//        UpFile upFile = filesService.createUpFile(upFileMapper.upFilePostDtoToupFile(upFilePostDto));

//        return new ResponseEntity<>(
//                new SingleResponseDto<>(upFileMapper.upFileToUpFileResponse(upFile)),
//                HttpStatus.CREATED);
        return "redirect:/upload";

    }
//    @GetMapping("/{upFile-id}")
//    public ResponseEntity<Resource> display(@PathVariable("upFile-id") long upFileId) {
//        UpFile upFile = filesService.findUpfile(upFileId);
//        String filename = upFile.getUpFilename();
//        String path = "C:/Users/saypart/Repository/seb40_main_023/server/src/main/resources/login/";
//        String folder = "";
//        Resource resource = (Resource) new FileSystemResource(path + folder + filename);
////        if (!resource.exists())
////            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
//        HttpHeaders header = new HttpHeaders();
//        Path filePath = null;
//        try {
//            filePath = Paths.get(path + folder + filename);
//            header.add("Content-type", Files.probeContentType(filePath));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
//    }

    @GetMapping("/{upFile-id}")
    public @ResponseBody byte[] getImage(@PathVariable("upFile-id") long upFileId) throws IOException{
        FileInputStream fis = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        UpFile upFile = upFileService.findUpfile(upFileId);
        String filename = upFile.getUpFilename();
        String path = "C:/Users/saypart/Repository/seb40_main_023/server/src/main/resources/login/";
        String fileDir = path+filename;
            try{
                fis = new FileInputStream(fileDir);
            } catch(FileNotFoundException e){
                e.printStackTrace();
            }

            int readCount = 0;
            byte[] buffer = new byte[1024];
            byte[] fileArray = null;

            try{
                while((readCount = fis.read(buffer)) != -1){
                    baos.write(buffer, 0, readCount);
                }
                fileArray = baos.toByteArray();
                fis.close();
                baos.close();
            } catch(IOException e){
                throw new RuntimeException("File Error");
            }
            return fileArray;
        }







//    @PostMapping("/upload")
//    public String upload(@RequestParam("uploadfile")
//                         MultipartFile[] uploadfile, Model model) {
//
//        List<FileDto> list = new ArrayList<>();
//
//        for (MultipartFile file : uploadfile) {
//            FileDto dto = new FileDto( file.getOriginalFilename(), file.getContentType() );
//            list.add(dto);
//            File newFileName = new File(dto.getFileName());
//
//            try {
//                file.transferTo(newFileName);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        model.addAttribute("files", list);
//        return "results";
//    }
}
