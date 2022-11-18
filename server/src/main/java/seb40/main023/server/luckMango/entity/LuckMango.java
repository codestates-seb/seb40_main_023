package seb40.main023.server.luckMango.entity;

import lombok.*;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "LUCKMANGOS")
public class LuckMango extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckMangoId;
    private String title;
    private String bgVideo;
    private String bgImage;
    private int likeCount = 0;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "luckMango", cascade = CascadeType.ALL)
    private List<LuckBag> luckBags = new ArrayList<>();

    public void addLuckBag(LuckBag luckBag) {
        luckBags.add(luckBag);
        if (luckBag.getLuckMango() != this) {
            luckBag.setLuckMango(this);
        }
    }

//    public LuckMango(long memberId, String title, String bgVideo, String bgImage, int likeCount, LocalDateTime createdAt, LocalDateTime modifiedAt){
//        this.title = title;
//        this.bgVideo = bgVideo;
//        this.bgImage = bgImage;
//        this.likeCount = likeCount;
//    }
//
//   public void addMember(Member member){
//       this.member= member;
//   }
}
