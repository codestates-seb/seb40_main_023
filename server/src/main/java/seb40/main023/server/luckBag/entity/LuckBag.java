package seb40.main023.server.luckBag.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Entity(name = "LUCKBAGS")
@Getter
@Setter
@NoArgsConstructor
public class LuckBag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckBagId;

    @Column(nullable = false)
    private String body;

    @Column
    private boolean viewed=false;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private int bagStyle;

    @ManyToOne
    @JoinColumn(name = "LUCKMANGO_ID")
    private LuckMango luckMango;
}
