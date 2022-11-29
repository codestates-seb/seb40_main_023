package seb40.main023.server.luckBag.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;
import javax.validation.constraints.Size;

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
    @Length(max=180)
    private String luckBagBody;

    @Length(max=15)
    private String writer;

    private boolean viewed=false;

    @Size(max = 99999999)
    private long nyMoney=0;

    private int bagStyle=1;

    private int bagColor=1;

    @ManyToOne
    @JoinColumn(name = "LUCKMANGO_ID")
    private LuckMango luckMango;
}
