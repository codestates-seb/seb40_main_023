package seb40.main023.server.member.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.helper.event.MemberRegistrationApplicationEvent;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.repository.MemberRepository;
import seb40.main023.server.security.auth.MemberDetails;
import seb40.main023.server.security.utils.CustomAuthorityUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 *  - 메서드 구현
 *  - DI 적용
 *  - Spring Data JPA 적용
 *  - 트랜잭션 적용
 */
@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public Member loginMember(Member member) {
        // DB 저장된 이메일 조회, 패스워드 매칭 확인후 로그인 처리 (임시로직)
        Member findMember = memberRepository.findByEmail(member.getEmail()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }

        return findMember;
    }

    public Member logoutMember(Long memberId, MemberDetails memberDetails) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        // 로그인된 사용자 UserName(email), password 일치시 로그아웃(임시로직)
        // 이메일 유효성 검사
        if(memberDetails.getUsername() == findMember.getEmail()){
            // 비밀번호 일치 검사
            if (!passwordEncoder.matches(findMember.getPassword(), memberDetails.getPassword())) {
                throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
            }
        }

        return findMember;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        // 임시 로직
        // Encrpted
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // Role save
        List<String> roles = CustomAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getImgUrl())
                .ifPresent(imgUrl -> findMember.setImgUrl(imgUrl));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

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
}