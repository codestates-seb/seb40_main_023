package seb40.main023.server.luckBag.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.audit.Auditable;

import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "LUCKBAGS")
public class LuckBag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckBagId;

    @Column(nullable = false)
    private String body;

    @Column
    private boolean viewed=false;

    @Column
    private String writer="";

    @Column
    private int bagStyle=0;

    @ManyToOne
    @JoinColumn(name = "LUCKMANGO_ID")
    private LuckMango luckMango;
}
