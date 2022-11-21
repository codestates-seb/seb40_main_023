package seb40.main023.server.luckBag.dto;

import lombok.Getter;

import lombok.*;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Builder
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

    // private String moneyName; 돈 보내는사람 이름
    // private Long money;  // 새뱃돈 보류
    //private Integer luckBagColor; // 복주머니 색상 보류
    //private Integer luckBagStyle; // 복주머니 종류 보류
}
