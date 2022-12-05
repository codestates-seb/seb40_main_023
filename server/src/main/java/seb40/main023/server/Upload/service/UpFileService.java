package seb40.main023.server.Upload.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb40.main023.server.Upload.repository.UpFileRepository;
import seb40.main023.server.Upload.entity.UpFile;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.member.service.MemberService;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpFileService {

    private final UpFileRepository upFileRepository;
    private final MemberService memberService;

    public void save(UpFile upFile) {
        UpFile upFiles = new UpFile();
        upFiles.setUpFilename(upFile.getUpFilename());
        upFiles.setUpFileOriName(upFile.getUpFileOriName());
        upFiles.setUpFileUrl(upFile.getUpFileUrl());
        upFiles.setImgUrl(upFile.getUpFileUrl());
        upFiles.setSubMemberId(upFile.getSubMemberId());
        upFiles.setMember(memberService.findVerifiedMember(upFile.getSubMemberId()));
        upFileRepository.save(upFiles);
    }

    public UpFile createUpFile(UpFile upFile) {
//        upFile.setMember(memberService.findVerifiedMember(upFile.getMember().getMemberId()));
        return upFileRepository.save(upFile);
    }

    public UpFile findUpfile(long upFileId) {

        return findVerifiedUpFile(upFileId);}

    public UpFile findVerifiedUpFile (long upFileId){
        Optional<UpFile> optionalUpFile = upFileRepository.findById(upFileId);
        UpFile findUpFile =
                optionalUpFile.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LUCKMANGO_NOT_FOUND));
        return findUpFile;
    }

}
