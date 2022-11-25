package seb40.main023.server.member.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.entity.Review;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "MEMBERS")
public class Member extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    @Builder.Default
    private String imgUrl = "";

    @Column
    @Builder.Default
    private long tot_Money = 0;

//    @Column
//    private List<String> roles;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    // 멤버 -> 복망고, 멤버 -> 리뷰는 1:N 관계
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<LuckMango> luckMangos = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    public void addLuckMango(LuckMango luckMango) {
        luckMangos.add(luckMango);
        if(luckMango.getMember() != this){
            luckMango.setMember(this);
        }
    }

    public void addReview(Review review) {
        reviews.add(review);
        if(review.getMember() != this) {
            review.setMember(this);
        }
    }

    public Member(Long memberId, String name, String email, String password) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}