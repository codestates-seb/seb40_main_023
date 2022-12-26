package seb40.main023.server.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import seb40.main023.server.awsS3.service.S3UpFileService;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.repository.MemberRepository;
import seb40.main023.server.security.utils.CustomAuthorityUtils;

import javax.validation.constraints.Email;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final S3UpFileService s3UpFileService;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        // 임시 로직
        // Encrpted
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // Role save
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        //로그인 이미지가 변화 하였는지 체크
        boolean check;
        if(Objects.equals(member.getImgUrl(), findMember.getImgUrl())){check = true;}
        else {check = false;}

        //        로그인 이미지가 null 아니고  로그인 이미지값이 변화가 있었을시  s3에서 파일 삭제
        if (!findMember.getImgUrl().equals("NONE") && !check) {
            try {
                s3UpFileService.deleteMember(findMember.getImgUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getImgUrl())
                .ifPresent(imgUrl -> findMember.setImgUrl(imgUrl));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

        findMember.setModifiedAt(LocalDateTime.now());


        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(String email) {
        return findVerifiedMember(email);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        if (!findMember.getImgUrl().equals("NONE")) {
            try {
                s3UpFileService.deleteMember(findMember.getImgUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember =
                memberRepository.findByEmail(email);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public void changePassWord(@Email String mail, String name) {
        Member member = findMember(mail);
        if (Objects.equals(name, member.getName())) {
            member.setPassword(passwordEncoder.encode("test1111!"));
        }
        else {throw new BusinessLogicException(ExceptionCode.NAME_NOT_MATCH);}
    }
}