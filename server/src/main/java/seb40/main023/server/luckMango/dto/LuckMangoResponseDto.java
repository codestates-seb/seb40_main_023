package seb40.main023.server.luckMango.dto;

import lombok.*;
import seb40.main023.server.member.dto.MemberResponseDto_Mango;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LuckMangoResponseDto {
    private long luckMangoId;

    private String title;
    private String mangoBody;

    private String bgVideo;
    private String bgImage;

    private long tot_Money;

    private int likeCount;
    private boolean reveal;

    private MemberResponseDto_Mango member;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    //    private List<LuckBagResponseDto> luckBags;
}
