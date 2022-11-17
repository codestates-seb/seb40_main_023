package seb40.main023.server.luckBag.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Builder
public class LuckBagResponseDto {
    private long luckBagId;
    private String body;
    private boolean viewed;
    private String writer;
    private int bagStyle;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
