package seb40.main023.server.luckMango.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import seb40.main023.server.member.entity.Member;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class LuckMangoResponseDto {
    private Long luckMangoId;
    private long memberId;
    private String title;
    private String bgVideo;
    private String bgImage;
    private int likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    public void setMember(Member member){ this.memberId = member.getMemberId();}
}
