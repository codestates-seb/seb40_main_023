package seb40.main023.server.luckBag.dto;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LuckBagPatchDto {

    @NotBlank(message = "내용을 작성해주세요!")
    private String body;
    private Long luckBagId;
    private String writer;
    private boolean viewed;

}
