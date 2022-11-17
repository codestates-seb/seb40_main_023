package seb40.main023.server.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "REVIEWS")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    public Review(Long reviewId){this.reviewId = reviewId;}

    private String reviewBody;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    public Review(long reviewId,long memberId,String reviewBody){
        this.reviewBody = reviewBody;
    }
}
