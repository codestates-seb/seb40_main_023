package seb40.main023.server.review.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
@Setter
public class ReviewPatchDto {
    private Long reviewId;
    private String reviewBody;
}
