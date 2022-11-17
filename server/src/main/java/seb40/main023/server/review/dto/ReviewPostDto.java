package seb40.main023.server.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewPostDto {
    @Positive
    private long memberId;
    private String reviewBody;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
