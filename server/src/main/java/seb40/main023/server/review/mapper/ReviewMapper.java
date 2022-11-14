package seb40.main023.server.review.mapper;

import org.mapstruct.Mapper;
import seb40.main023.server.review.dto.ReviewPatchDto;
import seb40.main023.server.review.dto.ReviewPostDto;
import seb40.main023.server.review.dto.ReviewResponseDto;
import seb40.main023.server.review.entity.Review;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);
}
