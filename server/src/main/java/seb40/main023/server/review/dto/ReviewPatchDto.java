package seb40.main023.server.review.dto;

import lombok.Getter;

@Getter
public class ReviewPatchDto {
    private Long reviewId;
    private String reviewBody;

    public void setReviewId(long reviewId){ this.reviewId = reviewId;}
}
