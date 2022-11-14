package seb40.main023.server.luckBag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40.main023.server.luckBag.entity.LuckBag;

@Repository
public interface LuckBagRepository extends JpaRepository<LuckBag , Long> {
    // jpaRepository 그냥 외워 무조건 필요한놈 <엔티티 클래스명 , PK타입>
    //검색 기능 구현시 findBy제목만들어야함


    
}
