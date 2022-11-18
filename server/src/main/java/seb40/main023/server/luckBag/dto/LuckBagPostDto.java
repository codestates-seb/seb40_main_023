package seb40.main023.server.luckBag.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class LuckBagPostDto {

    @NotBlank(message = "내용을 적어주세요!")
    private String body;

    @NotBlank(message = "작성자 이름을 적어주세요!")
    private String writer;
    private boolean viewed;
    private int bagStyle;

    @Positive
    private long luckMangoId;

    public LuckMango getLuckMango(){
        LuckMango luckMango = new LuckMango();
        luckMango.setLuckMangoId(luckMangoId);
        return luckMango;
    }

    //private boolean viewed;
    //private Long NYMoney
}
