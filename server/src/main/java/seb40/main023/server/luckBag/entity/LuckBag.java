package seb40.main023.server.luckBag.entity;

import lombok.Data;

import lombok.NoArgsConstructor;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;


@Entity(name = "LUCKBAGS")
@Data
@NoArgsConstructor
public class LuckBag extends Auditable {
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

    @ManyToOne
    @JoinColumn(name = "LUCKMANGO_ID")
    private LuckMango luckMango;
}
