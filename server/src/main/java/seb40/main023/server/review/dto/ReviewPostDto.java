package seb40.main023.server.review.dto;

import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.Positive;

public class ReviewPostDto {
    @Positive
    private long memberId;
    private Long reviewId;
    private String reviewBody;

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
