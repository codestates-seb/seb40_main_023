package seb40.main023.server.luckMango.dto;

import lombok.*;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

@Getter
@Builder
public class LuckMangoPostDto {
    @NonNull
    private String title;
    private String mangoBody;
    private String bgVideo;
    private String bgImage;
    private String reveal;
    @Positive
    private long memberId;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
