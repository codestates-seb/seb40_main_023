package seb40.main023.server.luckBag.entity;

import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Entity
@Table(name = "LUCKBAGS")
public class LuckBag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckBagId;
    private String body;
    private boolean viewed;
    private String writer;

    @ManyToOne
    @JoinColumn(name = "luckMangoId")
    private LuckMango luckMango;
}
