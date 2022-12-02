package seb40.main023.server.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb40.main023.server.member.dto.MemberPatchDto;
import seb40.main023.server.member.dto.MemberPostDto;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.entity.Member;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberPostDto requestBody);
    Member memberPatchToMember(MemberPatchDto requestBody);
    MemberResponseDto memberToMemberResponseDto(Member member);
    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);
}
