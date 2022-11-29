package seb40.main023.server.review.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import seb40.main023.server.audit.Auditable;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "REVIEWS")
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    @Length(max=130)
    private String reviewBody;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
