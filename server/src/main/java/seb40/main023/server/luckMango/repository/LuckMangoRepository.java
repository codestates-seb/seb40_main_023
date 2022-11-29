package seb40.main023.server.luckMango.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.util.List;


public interface LuckMangoRepository extends JpaRepository<LuckMango, Long> {

    @Query(value = "SELECT * FROM luckmangos WHERE member_Id = :memberId",nativeQuery = true)
    List<LuckMango> searchLuckMangoByMemberId(@Param("memberId") long memberId);

    @Query(value = "SELECT * FROM luckmangos WHERE reveal = :reveal",nativeQuery = true)
    List<LuckMango> searchLuckMangoByReveal(@Param("reveal") boolean reveal);
}