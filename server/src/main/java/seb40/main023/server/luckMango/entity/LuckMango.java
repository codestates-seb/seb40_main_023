package seb40.main023.server.luckMango.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.awsS3.entity.S3UpFile;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "LUCKMANGOS")
public class LuckMango extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckMangoId;

    @Column(nullable = false)
    @Length(max=16)
    private String title;

    @Column(nullable = false)
    @Length(max=500)
    private String mangoBody;

    @Column
    private String bgVideo;

    @Column
    private String bgImage;

    @Column
    private long tot_Money;

    @Column
    private int likeCount;

    @Column
    private boolean reveal;    // public, private는 예약어라 설장 안됨

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    @OneToMany(mappedBy = "luckMango", cascade = CascadeType.ALL)
    private List<LuckBag> luckBags = new ArrayList<>();

    public void addLuckBag(LuckBag luckBag) {
        luckBags.add(luckBag);
        if (luckBag.getLuckMango() != this) {
            luckBag.setLuckMango(this);
        }
    }

    public LuckMango(String title, String mangoBody) {
        this.title = title;
        this.mangoBody = mangoBody;
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