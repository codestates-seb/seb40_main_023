package seb40.main023.server.luckMango.dto;

import lombok.*;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LuckMangoPostDto {
    @Positive
    private long memberId;
    @NonNull
    private String title;
    private String bgImage;
    private String bgm;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
