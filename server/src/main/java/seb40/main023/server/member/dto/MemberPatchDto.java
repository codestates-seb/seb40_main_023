package seb40.main023.server.member.dto;

import lombok.*;
import seb40.main023.server.member.entity.MemberStatus;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberPatchDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private String imgUrl;
    private long tot_Money;
    private MemberStatus memberStatus;
    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
