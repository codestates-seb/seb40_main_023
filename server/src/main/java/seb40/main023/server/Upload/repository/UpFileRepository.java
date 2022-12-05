package seb40.main023.server.Upload.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40.main023.server.Upload.entity.UpFile;

public interface UpFileRepository extends JpaRepository<UpFile, Long> {
//    Optional<UpFile> findById(Long id);
}
