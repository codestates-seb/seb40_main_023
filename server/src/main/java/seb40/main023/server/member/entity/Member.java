package seb40.main023.server.member.entity;

import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.entity.Review;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long luckyBagId;
    private String name;
    private String email;
    private String password;
    private String since;
    private LocalDateTime lastLongin = LocalDateTime.now();
    private long nyMoney;


    // 멤버 -> 복망고는 1:N 관계

    @OneToMany(mappedBy = "member")
    private List<LuckMango> luckMangos = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    public List<Review> reviews = new ArrayList<>();


}
