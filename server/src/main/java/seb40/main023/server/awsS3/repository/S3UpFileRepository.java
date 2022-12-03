package seb40.main023.server.awsS3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40.main023.server.awsS3.entity.S3UpFile;
import seb40.main023.server.member.entity.Member;

import java.util.Optional;

public interface S3UpFileRepository extends JpaRepository<S3UpFile, Long> {
    Optional<S3UpFile> findByUpFileName(String upFileName);
    Optional<S3UpFile> findByUpFileUrl(String upFileUrl);
}
