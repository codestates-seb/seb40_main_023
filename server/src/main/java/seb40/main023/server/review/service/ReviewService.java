package seb40.main023.server.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.review.entity.Review;
import seb40.main023.server.review.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;

    public Review createReview(Review review) {
        review.setMember(memberService.findVerifiedMember(review.getMember().getMemberId()));
        return reviewRepository.save(review);
    }

    public Review findReview(long reviewId) {return findVerifiedReview(reviewId);}

    public Page<Review> findReviews(int page, int size){
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public Review updateReview(Review review) {
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getReviewBody())
                .ifPresent(reviewBody -> findReview.setReviewBody(reviewBody));

        findReview.setModifiedAt(LocalDateTime.now());

        return reviewRepository.save(findReview);
    }

    public void deleteReview (long reviewId){
        Review review = findVerifiedReview(reviewId);
        reviewRepository.delete(review);
    }

    public Review findVerifiedReview (long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review findReview =
                optionalReview.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return findReview;
    }


}
