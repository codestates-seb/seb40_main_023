package seb40.main023.server.luckBag.entity;

<<<<<<< HEAD
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity(name = "LUCKBAGS")
@Data
=======
import seb40.main023.server.luckMango.entity.LuckMango;

import javax.persistence.*;

@Entity
@Table(name = "LUCKBAGS")
>>>>>>> 7e0a8e702deb3ff98047049dbc7c3e41aa29f9f7
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

<<<<<<< HEAD
    @Column(nullable = false)
    private int bagStyle;

}
=======
    @ManyToOne
    @JoinColumn(name = "luckMangoId")
    private LuckMango luckMango;
}
>>>>>>> 7e0a8e702deb3ff98047049dbc7c3e41aa29f9f7
