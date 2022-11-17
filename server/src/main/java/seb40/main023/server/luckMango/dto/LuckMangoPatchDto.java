package seb40.main023.server.luckMango.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class LuckMangoPatchDto {
    private long luckMangoId;
    private String title;
    private String bgImage;
    private String bgm;
    private int likeCount;
}
