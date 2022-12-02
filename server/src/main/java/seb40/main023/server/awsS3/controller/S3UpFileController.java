package seb40.main023.server.awsS3.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import seb40.main023.server.awsS3.service.S3UpFileService;
import seb40.main023.server.awsS3.entity.S3UpFile;
import seb40.main023.server.luckMango.service.LuckMangoService;
import seb40.main023.server.member.service.MemberService;

import javax.validation.constraints.Positive;
import java.io.IOException;

@RestController
@RequestMapping("/s3")
@Validated
@RequiredArgsConstructor
@CrossOrigin // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용
public class S3UpFileController {
    private final S3UpFileService s3UpFileService;
    private final MemberService memberService;
    private final LuckMangoService luckMangoService;

    @PostMapping("/login")
    public String uploadFile(@Positive @RequestParam("memberId") long memberId, @RequestParam("images") MultipartFile multipartFile) throws IOException {
        S3UpFile s3Upfile = new S3UpFile();
        s3Upfile.setMember(memberService.findVerifiedMember(memberId));
        return s3UpFileService.upload(multipartFile,s3Upfile);
    }

    @PostMapping("/luckMango")
    public String upload2File( @RequestParam("images") MultipartFile multipartFile) throws IOException {
        S3UpFile s3Upfile = new S3UpFile();
        return s3UpFileService.upload2(multipartFile,s3Upfile);
    }
}
