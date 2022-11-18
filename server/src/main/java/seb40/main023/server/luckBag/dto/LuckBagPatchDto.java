package seb40.main023.server.luckBag.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class LuckBagPatchDto {


    private Long luckBagId;
    private String body;
    private String writer;
    private int bagStyle;
    //private boolean viewed;
    //여기도 럭망고 아이디 넣어주는게 좋음
}
