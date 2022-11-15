package seb40.main023.server.luckBag.dto;

import lombok.Data;

@Data
public class LuckBagResponseDto {
    private Long luckBagId;
    private String body;
    private boolean viewed;
    private String writer;
}
