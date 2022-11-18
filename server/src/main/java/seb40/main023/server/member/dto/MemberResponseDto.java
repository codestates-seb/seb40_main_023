package seb40.main023.server.member.dto;

import lombok.*;
import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.MemberStatus;
import seb40.main023.server.review.dto.ReviewResponseDto;
import seb40.main023.server.review.entity.Review;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private int nyMoney;
    private MemberStatus memberStatus;
//    private List<LuckMangoResponseDto> luckMangos;
//    private List<ReviewResponseDto> reviews;
}
