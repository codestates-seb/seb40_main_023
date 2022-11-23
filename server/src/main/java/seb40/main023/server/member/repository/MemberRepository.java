package seb40.main023.server.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40.main023.server.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(long memberId);
    Optional<Member> findByEmail(String email);
}
