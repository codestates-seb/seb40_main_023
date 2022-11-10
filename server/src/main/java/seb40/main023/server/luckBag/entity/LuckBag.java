package seb40.main023.server.luckBag.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "LUCKBAGS")
public class LuckBag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckBagId;
    private String body;
    private boolean viewed;
    private String writer;

}
