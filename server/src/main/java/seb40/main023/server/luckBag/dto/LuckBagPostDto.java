package seb40.main023.server.luckBag.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@AllArgsConstructor
public class LuckBagPostDto {

    private Long luckBagId;

    private long luckMangoId;

    @NotBlank(message = "내용을 적어주세요!")
    private String body;

    @NotBlank(message = "작성자 이름을 적어주세요!")
    private String writer;

    private int bagStyle;

    private int bagColor;

    public LuckMango getLuckMango(){
        LuckMango luckMango = new LuckMango();
        luckMango.setLuckMangoId(luckMangoId);
        return luckMango;
    }


    //private boolean viewed;
    //private Long NYMoney
}
