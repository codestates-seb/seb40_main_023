package seb40.main023.server.luckMango.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class LuckMangoPatchDto {
    @Positive
    private long luckMangoId;

    @NotBlank(message = "제목을 적어주세요!")
    private String title;

    @NotBlank(message = "내용을 적어주세요!")
    private String mangoBody;

    private String bgVideo;
    private String bgImage;
    private boolean reveal;

    public void setLuckMangoId(long luckMangoId) {
        this.luckMangoId = luckMangoId;
    }
}
