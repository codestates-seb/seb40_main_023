package seb40.main023.server.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewPostDto {
    private String reviewBody;
    @Positive
    private long memberId;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
