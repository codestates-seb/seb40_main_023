package seb40.main023.server.luckBag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class LuckBagPatchDto {
    private Long luckBagId;
    @NotBlank(message = "내용을 작성해주세요!")
    private String body;
    private String writer;
    private boolean viewed;
    private int bagStyle;
}
