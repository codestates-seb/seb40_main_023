package seb40.main023.server.luckBag.dto;

import lombok.*;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto_Bag;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LuckBagResponseDto {
    private long luckBagId;

    private String luckBagBody;
    private String writer;

    private int bagStyle;
    private int bagColor;
    private long nyMoney;

    private boolean viewed;

    private LuckMangoResponseDto_Bag luckMango;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
