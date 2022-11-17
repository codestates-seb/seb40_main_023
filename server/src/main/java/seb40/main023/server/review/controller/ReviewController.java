package seb40.main023.server.review.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.luckMango.mapper.LuckMangoMapper;
import seb40.main023.server.luckMango.service.LuckMangoService;
import seb40.main023.server.response.MultiResponseDto;
import seb40.main023.server.response.SingleResponseDto;
import seb40.main023.server.review.dto.ReviewPatchDto;
import seb40.main023.server.review.dto.ReviewPostDto;
import seb40.main023.server.review.entity.Review;
import seb40.main023.server.review.mapper.ReviewMapper;
import seb40.main023.server.review.service.ReviewService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
@RestController
@RequestMapping("/v1/review")
@Validated
@Slf4j
public class ReviewController {
    private ReviewService reviewService;
    private ReviewMapper reviewMapper;

    public ReviewController(ReviewService reviewService, ReviewMapper reviewMapper){
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
    }

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto reviewPostDto){
        Review review = reviewService.createReview(reviewMapper.reviewPostDtoToReview(reviewPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(reviewMapper.reviewToReviewResponseDto(review)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") long reviewId,
                                         @Valid @RequestBody ReviewPatchDto reviewPatchDto) {
        reviewPatchDto.setReviewId(reviewId);
        Review review = reviewService.updateReview(reviewMapper.reviewPatchDtoToReview(reviewPatchDto));
//        long memberId = content.getMemberId();   // 멤버 아이디가 동일하지 않으면 수정 불가
//        if(nowMemberId != memberId){return new ResponseEntity(HttpStatus.BAD_REQUEST);}

        return new ResponseEntity<>(
                new SingleResponseDto<>(reviewMapper.reviewToReviewResponseDto(review)),HttpStatus.OK);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") long reviewId){
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(reviewMapper.reviewToReviewResponseDto(review)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getReviews(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size) {
        Page<Review> pageReviews = reviewService.findReviews(page - 1, size);
        List<Review> reviews = pageReviews.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(reviewMapper.reviewToReviewResponseDtos(reviews),
                        pageReviews), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") long reviewId){
//        Content content = contentService.findContent(contentId);      // 현재멤버아이디가 동일하지 않으면 삭제 안됨
//        long memberId = content.getMemberId();
//        if(nowMemberId != memberId){return new ResponseEntity(HttpStatus.BAD_REQUEST);}
        reviewService.deleteReview(reviewId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
