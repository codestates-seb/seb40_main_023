package seb40.main023.server.luckBag.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.util.List;

public interface LuckBagRepository extends JpaRepository<LuckBag , Long> {
    // jpaRepository 그냥 외워 무조건 필요한놈 <엔티티 클래스명 , PK타입>
    //검색 기능 구현시 findBy제목만들어야함

    //jap 가 함수를 유추해서 함수를 만들어주는 기능이 있다..? https://ppomelo.tistory.com/155
    // 럭망고를 검색조건에  집어넣으려면 리턴 타입을 지정해줘야한다.
    // 페이지 처리를 할꺼기떄문에
    // 페이지 처리를 해주는 메소드
    // 페이지 처리 : 검색 결과 1만건일때 / 한번에 클라이언트 한테 전달하면 느리기 때문에 , 서버에서 짤라서 준다 10개 20개씩 주세요 이런식으로

    @Query(value = "SELECT * FROM luckbags WHERE luckmango_Id = :luckMangoId",nativeQuery = true)
    List<LuckBag> searchLuckBagByLuckMango(@Param("luckMangoId") long luckMangoId);

//    List<LuckBag> findByLuckMangoId(Long luckMangoId);

//    @Query(value = "SELECT * FROM LuckMango WHERE member_Id = :memberId",nativeQuery = true)
//    List<LuckMango> searchLuckMangoByMemberId(@Param("memberId") long memberId);


    
}
