package seb40.main023.server.awsS3.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import seb40.main023.server.awsS3.entity.S3UpFile;
import seb40.main023.server.awsS3.repository.S3UpFileRepository;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.luckMango.service.LuckMangoService;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.service.MemberService;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용
@RequiredArgsConstructor
@Service
public class S3UpFileService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;
    private final MemberService memberService;
    private final S3UpFileRepository s3UpFileRepository;


    public String upload(MultipartFile multipartFile, S3UpFile s3UpFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket+"login", s3FileName, multipartFile.getInputStream(), objMeta);


        S3UpFile s3UpFiles = new S3UpFile();
        s3UpFiles.setUpFileName(s3FileName);
        s3UpFiles.setUpFileUrl("https://saypart.s3.ap-northeast-2.amazonaws.com/login/"+s3FileName);
        s3UpFiles.setMember(memberService.findVerifiedMember(s3UpFile.getMember().getMemberId())); // 멤버 세팅
        s3UpFiles.getMember().setImgUrl(s3UpFiles.getUpFileUrl());
        s3UpFileRepository.save(s3UpFiles);


        return s3UpFiles.getUpFileUrl();
    }

    public String upload2(MultipartFile multipartFile, S3UpFile s3UpFile) throws IOException {
        String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());

        amazonS3.putObject(bucket+"luckMango", s3FileName, multipartFile.getInputStream(), objMeta);


        S3UpFile s3UpFiles = new S3UpFile();
        s3UpFiles.setUpFileName(s3FileName);
        s3UpFiles.setUpFileUrl("https://saypart.s3.ap-northeast-2.amazonaws.com/luckMango/"+s3FileName);
        s3UpFileRepository.save(s3UpFiles);


        return s3UpFiles.getUpFileUrl();
    }
//파일 이름받아서 찾아서 삭제
    public String deleteS3File(String upFileName) throws IOException {
        S3UpFile s3UpFile = findVerifiedUpFileName(upFileName);
        String filename = s3UpFile.getUpFileName();
        try {
            s3UpFileRepository.delete(s3UpFile);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket+"luckMango",filename));
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        return "파일 삭제됨";
    }

//파일 URL를 받아서 삭제(복망고)
    public String deleteLuckMango(String upFileName) throws IOException {
        S3UpFile s3UpFile = findVerifiedUpFileUrl(upFileName);
        String filename = s3UpFile.getUpFileName();
        try {
            s3UpFileRepository.delete(s3UpFile);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket+"luckMango",filename));
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        return "파일 삭제됨";
    }

//파일 URL를 받아서 삭제(멤버)
    public String deleteMember(String upFileName) throws IOException {
        S3UpFile s3UpFile = findVerifiedUpFileUrl(upFileName);
        String filename = s3UpFile.getUpFileName();
        try {
            s3UpFileRepository.delete(s3UpFile);
            amazonS3.deleteObject(new DeleteObjectRequest(bucket+"login",filename));
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
        }
        return "파일 삭제됨";
    }

    public S3UpFile findVerifiedUpFileName (String upFileName){
        Optional<S3UpFile> optionalS3UpFile = s3UpFileRepository.findByUpFileName(upFileName);
        S3UpFile findS3UpFile =
                optionalS3UpFile.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.S3_FILE_NOT_FOUND));
        return findS3UpFile;
    }


    public S3UpFile findVerifiedUpFileUrl (String upFileUrl){
        Optional<S3UpFile> optionalS3UpFile = s3UpFileRepository.findByUpFileUrl(upFileUrl);
        S3UpFile findS3UpFile =
                optionalS3UpFile.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.S3_FILE_NOT_FOUND));
        return findS3UpFile;
    }
}
