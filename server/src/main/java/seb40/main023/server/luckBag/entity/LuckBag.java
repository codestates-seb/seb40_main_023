package seb40.main023.server.luckBag.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Entity(name = "LUCKBAGS")
@Getter
@Setter
public class LuckBag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column
    private Long luckBagId;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private int bagStyle;

    @Column(nullable = false)
    private int bagColor;

    @Column
    private boolean viewed;

    @ManyToOne
    @JoinColumn(name = "luckMangoId")
    private LuckMango luckMango;
}
