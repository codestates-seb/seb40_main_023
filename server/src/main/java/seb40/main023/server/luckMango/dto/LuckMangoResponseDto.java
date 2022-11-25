package seb40.main023.server.luckMango.dto;

import lombok.*;
import seb40.main023.server.member.dto.MemberResponseDto;
import seb40.main023.server.member.dto.MemberResponseDto_Mango;
import seb40.main023.server.member.entity.Member;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LuckMangoResponseDto {
    private long luckMangoId;
    private String title;
    private String mangoBody;
    private String bgVideo;
    private String bgImage;
    private int likeCount;
    private String reveal;
    private MemberResponseDto_Mango member;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    //    private List<LuckBagResponseDto> luckBags;
}
