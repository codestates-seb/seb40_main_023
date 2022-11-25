package seb40.main023.server.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.dto.MemberPostDto;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.mapper.MemberMapper;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.response.MultiResponseDto;
import seb40.main023.server.response.SingleResponseDto;
import seb40.main023.server.security.auth.MemberDetails;
import seb40.main023.server.security.dto.LoginDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @GetMapping("/register")
    public String registerMemberForm() {
        return "member-register";
    }

    @PostMapping("/register")
    public String registerMember(@Valid MemberPostDto requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        memberService.createMember(member);

        System.out.println("Member Registration Successfully");
        return "login";
    }

    @GetMapping("/my-page")
    public String myPage() {
        return "my-page";
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginDto loginDto) throws JsonProcessingException {
        Member member = mapper.loginDtoToMember(loginDto);

        Member authorizedMember = memberService.loginMember(member);

        MemberResponseDto responseDto = mapper.memberToMemberResponseDto(authorizedMember);
        long memberId = responseDto.getMemberId();

//        TokenResponseDto tokenResponseDto = jwtProvider.createTokensByLogin(responseDto);

//        Map<String, Object> claims = jwtProvider.getClaims(tokenResponseDto.getAtk()).getBody();
//        long memberId = Long.parseLong(claims.get("memberId").toString());

//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + tokenResponseDto.getAtk());
//        headers.add("Refresh", tokenResponseDto.getRtk());

        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

//    @Transactional
//    @GetMapping("/logout/{member-id}")
//    public ResponseEntity logout(@PathVariable("member-id") @Positive long memberId,
//                                 @AuthenticationPrincipal MemberDetails memberDetails) {
//        // 실질적 로그아웃 기능은 구현 안됨
//        // 임시로 멤버 아이디에 해당 되는 Member.email과 로그인 되어있는 getUserName(email) 일치 여부로
//        // OK 응답 로직
//        memberService.logoutMember(memberId, memberDetails);
//        return new ResponseEntity<>("로그아웃이 완료되었습니다.", HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto requestBody) {
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<MemberResponseDto>(mapper.memberToMemberResponseDto(member)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto requestBody) {

        requestBody.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<MemberResponseDto>(mapper.memberToMemberResponseDto(member)),
                HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<MemberResponseDto>(mapper.memberToMemberResponseDto(member)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponseDtos(members), pageMembers),
                HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
