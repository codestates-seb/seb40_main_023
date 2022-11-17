package seb40.main023.server.luckMango.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity(name = "LUCKMANGOS")
public class LuckMango extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckMangoId;
    private String title;
    private String bgm;
    private String bgImage;
    private int likeCount;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "luckMango", cascade = CascadeType.ALL)
    private List<LuckBag> luckBags = new ArrayList<>();

   public void addLuckBag(LuckBag luckBag){
       luckBags.add(luckBag);
       if(luckBag.getLuckMango() != this){
           luckBag.setLuckMango(this);
       }
   }
}
