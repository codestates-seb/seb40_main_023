package seb40.main023.server.review.dto;

import lombok.*;
import seb40.main023.server.member.entity.Member;


@NoArgsConstructor
//@Builder
@Getter
@Setter
public class ReviewResponseDto {
    private Long reviewId;
    private long memberId;
    private String reviewBody;

    public void setMember(Member member){this.memberId = member.getMemberId();}
}
