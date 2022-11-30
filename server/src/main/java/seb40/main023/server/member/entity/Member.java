package seb40.main023.server.member.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.review.entity.Review;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "MEMBERS")
public class Member extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    @Length(max=10)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column             // imgUrl 얘만 기본값 Null로 생성됨
    private String imgUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

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