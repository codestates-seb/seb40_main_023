package seb40.main023.server.luckMango.dto;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.Member;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LuckMangoResponseDto {
    private long luckMangoId;
    private String title;
    private String bgm;
    private String bgImage;
    private int likeCount;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

//    private List<LuckBagResponseDto> luckBags;
}
