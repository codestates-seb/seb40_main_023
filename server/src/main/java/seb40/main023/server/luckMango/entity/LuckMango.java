package seb40.main023.server.luckMango.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity(name = "LUCKMANGO")
public class LuckMango {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckMangoId;
    public LuckMango(Long luckMangoId){
        this.luckMangoId = luckMangoId;
    }

    private String title;
    private String bgVideo;
    private String bgImage;
    private int likeCount;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "luckMango")
    private List<LuckBag> luckBags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    public LuckMango(String title, String bgVideo, String bgImage){
        this.title = title;
        this.bgVideo = bgVideo;
        this.bgImage = bgImage;

    }

    public LuckMango(long memberId, String title, String bgVideo, String bgImage, int likeCount, LocalDateTime createdAt, LocalDateTime modifiedAt){
        this.title = title;
        this.bgVideo = bgVideo;
        this.bgImage = bgImage;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }



   public void addMember(Member member){
       this.member= member;
   }
}
