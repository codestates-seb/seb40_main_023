package seb40.main023.server.member.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.dto.MemberPostDto;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.mapper.MemberMapper;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.response.MultiResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1/members")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberDto) {
        Member member =
                memberService.createMember(mapper.memberPostToMember(memberDto));
        return new ResponseEntity<>(mapper.memberToResponseDto(member), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId, @Valid @RequestBody MemberPatchDto memberPatchDto) {

        memberPatchDto.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMemberDto(memberPatchDto));

        return new ResponseEntity<>(mapper.memberToResponseDto(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToResponseDto(member), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page-1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponseDtos(members),
                        pageMembers),HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
