package seb40.main023.server.member.mapper;

import org.mapstruct.Mapper;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.dto.MemberPostDto;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.entity.Member;

import java.util.List;

@Mapper(componentModel="spring")
public interface MemberMapper {
    Member memberPostToMember(MemberPostDto requestBody);
    Member memberPatchToMemberDto(MemberPatchDto requestBody);
    MemberResponseDto memberToResponseDto(Member member);
    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);
}
