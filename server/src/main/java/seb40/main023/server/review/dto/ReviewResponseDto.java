package seb40.main023.server.review.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String reviewBody;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
