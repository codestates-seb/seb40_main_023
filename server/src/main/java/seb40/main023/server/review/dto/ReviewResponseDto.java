package seb40.main023.server.review.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@Builder
public class ReviewResponseDto {
    private long reviewId;
    private String reviewBody;
    private long memberId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
