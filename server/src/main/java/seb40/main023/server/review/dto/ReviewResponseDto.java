package seb40.main023.server.review.dto;

import lombok.*;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.dto.MemberResponseDto_Mango;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class ReviewResponseDto {
    private long reviewId;
    private String reviewBody;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private MemberResponseDto_Mango member;
}
