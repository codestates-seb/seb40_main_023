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

    @NotBlank(message = "내용을 적어주세요!")
    private String luckBagBody;

    @NotBlank(message = "작성자 이름을 적어주세요!")
    private String writer;

    private int bagStyle;
    private int bagColor;
}
