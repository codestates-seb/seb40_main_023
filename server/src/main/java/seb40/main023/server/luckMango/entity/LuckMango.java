package seb40.main023.server.luckMango.entity;

import seb40.main023.server.luckBag.entity.LuckBag;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LuckMango {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckMangoId;
    private String title;
    private int likeCount;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "luckMango")
    private List<LuckMango> luckMangos = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "luckBagId")
    private LuckBag luckBag;

    public void addLuckBag(LuckBag luckBag){
        this.luckBag = luckBag;
    }
}
