package seb40.main023.server.luckBag.dto;


import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LuckBagPostDto {

    private Long luckBagId;

    @NotBlank(message = "내용을 작성해주세요!")
    private String body;

    private boolean viewed;

    private String writer;




    // private String moneyName; 돈 보내는사람 이름

    // private Long money;  // 새뱃돈 보류

    //private Integer luckBagColor; // 복주머니 색상 보류
    
    //private Integer luckBagStyle; // 복주머니 종류 보류
}
