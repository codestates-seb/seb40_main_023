package seb40.main023.server.review.entity;

import seb40.main023.server.member.entity.Member;

import javax.persistence.*;

@Entity(name = "REVIEWS")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private String reviewBody;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

}
