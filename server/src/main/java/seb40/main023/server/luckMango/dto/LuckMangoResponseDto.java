package seb40.main023.server.luckMango.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.Member;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class LuckMangoResponseDto {
    private long luckMangoId;
    private String title;
    private String bgm;
    private String bgImage;
    private int likeCount;
    private long memberId;
    public void setMember(Member member){ this.memberId = member.getMemberId();}

    private List<LuckBagResponseDto> luckBags;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
