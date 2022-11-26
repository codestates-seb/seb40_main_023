package seb40.main023.server.luckBag.entity;

import lombok.*;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "LUCKBAGS")
@Builder
public class LuckBag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckBagId;

    @Column(nullable = false)
    private String luckBagBody;

    private String writer;

    @Builder.Default
    private boolean viewed=false;

    @Builder.Default
    private long nyMoney=0;

    @Builder.Default
    private int bagStyle=1;

    @Builder.Default
    private int bagColor=1;

    @ManyToOne
    @JoinColumn(name = "LUCKMANGO_ID")
    private LuckMango luckMango;
}
