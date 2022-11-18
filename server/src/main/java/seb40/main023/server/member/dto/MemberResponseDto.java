package seb40.main023.server.member.dto;

import lombok.*;
import seb40.main023.server.member.entity.MemberStatus;


import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private String imgUrl;
    private int nyMoney;
    private MemberStatus memberStatus;

//    private List<LuckMangoResponseDto> luckMangos;
//    private List<ReviewResponseDto> reviews;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
