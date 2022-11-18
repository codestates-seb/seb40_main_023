package seb40.main023.server.luckBag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.NotNull;


@Getter
@Setter
@AllArgsConstructor
public class LuckBagResponseDto {


    private Long luckBagId;

    private long luckMangoId;

    private String body;

    private String writer;

    private int bagStyle;

    private int bagColor;

    private boolean viewed;


}
