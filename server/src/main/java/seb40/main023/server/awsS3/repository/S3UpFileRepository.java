package seb40.main023.server.awsS3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40.main023.server.awsS3.entity.S3UpFile;

public interface S3UpFileRepository extends JpaRepository<S3UpFile, Long> {

}
