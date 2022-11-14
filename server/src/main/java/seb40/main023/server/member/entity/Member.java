package seb40.main023.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.entity.Review;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private int nyMoney = 0;

    // 멤버 -> 복망고는 1:N 관계
    @OneToMany(mappedBy = "member")
    private List<LuckMango> luckMangos = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    public List<Review> reviews = new ArrayList<>();
    public Member(String name, String email, String password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}