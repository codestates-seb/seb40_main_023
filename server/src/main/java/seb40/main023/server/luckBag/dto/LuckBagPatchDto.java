package seb40.main023.server.luckBag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class LuckBagPatchDto {
    private Long luckBagId;

    private String luckBagBody;

    private String writer;

    private int bagStyle;

    private boolean viewed;

    private int bagColor;
}
