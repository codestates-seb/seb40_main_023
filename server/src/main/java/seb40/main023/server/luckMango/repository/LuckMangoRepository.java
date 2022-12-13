package seb40.main023.server.luckMango.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.time.LocalDateTime;
import java.util.List;


public interface LuckMangoRepository extends JpaRepository<LuckMango, Long> {

    @Query(value = "SELECT * FROM luckmangos WHERE member_Id = :memberId ORDER by luck_mango_id desc",nativeQuery = true)
    List<LuckMango> searchLuckMangoByMemberId(@Param("memberId") long memberId);

    @Query(value = "SELECT * FROM luckmangos WHERE reveal = True ORDER by like_count desc" ,nativeQuery = true)
    List<LuckMango> searchLuckMangoByReveal2();


    @Query(value = "SELECT * FROM luckmangos WHERE reveal = True ORDER by luck_mango_id desc" ,nativeQuery = true)
    List<LuckMango> searchLuckMangoByReveal();

    @Query(value = "SELECT COUNT(*) FROM luckbags WHERE luckmango_Id = :luckMangoId AND viewed = False",nativeQuery = true)
    int searchNewLuckbag(@Param("luckMangoId") long luckMangoId);

    @Query(value = "SELECT COUNT(*) FROM luckmangos WHERE created_at >= date_add(now(), interval - :ago day)",nativeQuery = true)
    int searchAgoDayLuckMango(@Param("ago") int ago);

    @Query(value = "SELECT COUNT(*) FROM luckmangos WHERE created_at >= :time1 AND created_at <= :time2",nativeQuery = true)
    int searchDayLuckMango(@Param("time1") String time1, @Param("time2") String time2);


}