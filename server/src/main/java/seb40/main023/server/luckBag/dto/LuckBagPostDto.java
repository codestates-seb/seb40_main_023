package seb40.main023.server.luckBag.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Range;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class LuckBagPostDto {
    @NotBlank(message = "내용을 적어주세요!")
    private String luckBagBody;

    @NotBlank(message = "작성자 이름을 적어주세요!")
    private String writer;

    private int bagStyle;
    private int bagColor;

    @Range(min= 0, max= 10000000,message  = "1 ~ 10,000,000")
    private long nyMoney;

    private boolean viewed;

    @Positive
    private long luckMangoId;

    public LuckMango getLuckMango(){
        LuckMango luckMango = new LuckMango();
        luckMango.setLuckMangoId(luckMangoId);
        return luckMango;
    }

    public LuckBagPostDto(String luckBagBody, String writer, long luckMangoId) {
        this.luckBagBody = luckBagBody;
        this.writer = writer;
        this.bagStyle = 1;
        this.bagColor = 1;
        this.nyMoney = 0;
        this.viewed = false;
        this.luckMangoId = luckMangoId;
    }
}
