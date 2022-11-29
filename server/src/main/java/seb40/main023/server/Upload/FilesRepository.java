package seb40.main023.server.Upload;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FilesRepository extends JpaRepository<Files, Long> {
    Optional<Files> findById(Long id);
}
