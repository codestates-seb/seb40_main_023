package seb40.main023.server.review.dto;

import lombok.*;
import seb40.main023.server.audit.Auditable;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private long reviewId;
    private String reviewBody;
    private long memberId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
