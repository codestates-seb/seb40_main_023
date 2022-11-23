package seb40.main023.server.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40.main023.server.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
