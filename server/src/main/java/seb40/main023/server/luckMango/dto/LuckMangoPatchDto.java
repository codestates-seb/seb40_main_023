package seb40.main023.server.luckMango.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LuckMangoPatchDto {
    private long luckMangoId;
    private String title;
    private String bgImage;
    private String bgVideo;
    private int likeCount;

    public void setLuckMangoId(long luckMangoId) {
        this.luckMangoId = luckMangoId;
    }
}
