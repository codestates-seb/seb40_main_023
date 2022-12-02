package seb40.main023.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb40.main023.server.member.entity.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto_Mango {
    private long memberId;
    private String name;
    private String email;
    private String imgUrl;
}
