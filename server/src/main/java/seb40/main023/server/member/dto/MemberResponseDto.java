package seb40.main023.server.member.dto;

import lombok.*;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.dto.ReviewResponseDto;
import seb40.main023.server.review.entity.Review;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private int nyMoney;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private List<LuckMangoResponseDto> luckMangos;
    private List<ReviewResponseDto> reviews;

    public MemberResponseDto(long memberId, String name, String email, String password) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
