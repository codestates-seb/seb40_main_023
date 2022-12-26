package seb40.main023.server.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.dto.MemberPostDto;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.mapper.MemberMapper;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.response.MultiResponseDto;
import seb40.main023.server.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Validated
@CrossOrigin // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

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

    //중복된 이메일 체크 확인
    @GetMapping("/mail")
    public String getMail(@Email @RequestParam String mail) {
        Member member = memberService.findMember(mail);
        return "이미 가입된 이메일 입니다.";
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/findPassword")
    public ResponseEntity patchPassWord(@Email @RequestParam String mail, @RequestParam String name) {

        memberService.changePassWord(mail,name);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
