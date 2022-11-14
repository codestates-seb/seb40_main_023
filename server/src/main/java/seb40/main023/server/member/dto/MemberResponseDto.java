package seb40.main023.server.member.dto;

import lombok.Builder;
import lombok.Getter;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.entity.Review;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MemberResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private int nyMoney;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private List<LuckMango> luckMangos;
    private List<Review> reviews;
}
