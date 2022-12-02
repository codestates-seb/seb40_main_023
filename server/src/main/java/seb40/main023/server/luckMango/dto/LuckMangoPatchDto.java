package seb40.main023.server.luckMango.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class LuckMangoPatchDto {
    @Positive
    private long luckMangoId;

    private String title;
    private String mangoBody;
    private String bgVideo;
    private String bgImage;
    private boolean reveal;
    private int likeCount;

    public void setLuckMangoId(long luckMangoId) {
        this.luckMangoId = luckMangoId;
    }
}
