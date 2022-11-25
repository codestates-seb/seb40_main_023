package seb40.main023.server.luckBag.dto;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto_Bag;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LuckBagResponseDto {
    private long luckBagId;
    private String body;
    private String writer;
    private boolean viewed;
    private int bagStyle;
    private int bagColor;
    private long NYMoney;
    private LuckMangoResponseDto_Bag luckMango;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
