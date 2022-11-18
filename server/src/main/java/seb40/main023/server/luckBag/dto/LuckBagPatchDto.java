package seb40.main023.server.luckBag.dto;

import com.sun.istack.NotNull;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LuckBagPatchDto {
    private Long luckBagId;
    @NotBlank(message = "내용을 작성해주세요!")
    private String body;
    private String writer;
    private boolean viewed;

}
