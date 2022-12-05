package seb40.main023.server.luckMango.dto;

import lombok.*;
import seb40.main023.server.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor // 레스트독스를 위해 필요
@AllArgsConstructor // 레스트독스를 위해 필요
@Builder  // 레스트독스를 위해 필요
public class LuckMangoPostDto {
    @NotBlank(message = "제목을 적어주세요!")
    private String title;

    @NotBlank(message = "내용을 적어주세요!")
    private String mangoBody;

    private String bgImage;
    private String bgVideo;
    private boolean reveal;
    @Positive
    private long memberId;

    public void setMemberId(long memberId){
        this.memberId = memberId;
    }

    public Member getMember(){
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }

    public LuckMangoPostDto(String title, String mangoBody, long memberId) {
        this.title = title;
        this.mangoBody = mangoBody;
        this.bgImage = "NONE";
        this.bgVideo = "NONE";
        this.reveal = false;  //초기값은 비공개로
        this.memberId = memberId;
    }
}
