package seb40.main023.server.luckMango.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

@Builder
@Getter
public class LuckMangoPostDto {
    @Positive
    private long memberId;
    @NonNull
    private String title;
    private String bgImage;
    private String bgVideo;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
