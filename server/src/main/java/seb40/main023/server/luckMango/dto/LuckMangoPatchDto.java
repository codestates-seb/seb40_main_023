package seb40.main023.server.luckMango.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@NoArgsConstructor // 레스트독스를 위해 필요
@AllArgsConstructor // 레스트독스를 위해 필요
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
