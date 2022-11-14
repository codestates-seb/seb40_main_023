package seb40.main023.server.luckBag.entity;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity(name = "LUCKBAGS")
@Data
public class LuckBag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column
    private Long luckBagId;

    @Column(nullable = false)
    private String body;

    @Column
    private boolean viewed;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private int bagStyle;

}