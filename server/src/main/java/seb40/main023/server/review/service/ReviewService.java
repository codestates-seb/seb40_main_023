package seb40.main023.server.review.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.review.entity.Review;
import seb40.main023.server.review.repository.ReviewRepository;

import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review createReview(Review review) {
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
                        new BusinessLogicException(ExceptionCode.LUCKMANGO_NOT_FOUND));
        return findReview;
    }


}
