package seb40.main023.server.luckBag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckBag.repository.LuckBagRepository;
import seb40.main023.server.luckMango.service.LuckMangoService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class LuckBagService {
    private final LuckBagRepository luckBagRepository;
    private final LuckMangoService luckMangoService;

    // C 복주머니 생성
    public LuckBag createdLuckBag(LuckBag luckBag){
        luckBag.setLuckMango(luckMangoService.findVerifiedLuckMango(luckBag.getLuckMango().getLuckMangoId())); // 복밍고 아이디 세팅

        long tot_Money = luckBag.getLuckMango().getTot_Money();
        tot_Money += luckBag.getNyMoney();
        luckBag.getLuckMango().setTot_Money(tot_Money);
        luckBag.getLuckMango().setNewLuckBagTime(LocalDateTime.now());

        return luckBagRepository.save(luckBag);
        // 럭백을 세이브 메소드를 이용해서 리파지토리로 넣어주세요 하는 결과가 나온다.
    }

    // 특정 복주머니 하나만 조회
    public LuckBag findLuckBag(long luckBagId) { return findVerifiedLuckBag(luckBagId);}

    // 복주머니 전체 조회 페이지
    public Page<LuckBag> findLuckBags(int page, int size){
            return luckBagRepository.findAll(PageRequest.of(page, size,
                    Sort.by("luckBagId").descending()));
            // page = 게시판 게시글 넘기는 페이지
            // size = 게시글 보여줄 갯수
    }

    // 입력한 복망고 아이디를 가진 복주머니 가져오기
    public Page<LuckBag> findLuckBagList(long luckMangoId, int page, int size){
        PageRequest pageRequest = PageRequest.of(page,size,Sort.by("luckBagId").descending());
        List<LuckBag> Result = luckBagRepository.searchLuckBagByLuckMango(luckMangoId);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), Result.size());
        Page<LuckBag> luckBags = new PageImpl<>(Result.subList(start, end), pageRequest, Result.size());

        return luckBags;

        //        이전에 짰던거
//        return luckBagRepository.findByLuckMangoId(
//                PageRequest.of(page, size,Sort.by("luckBagId").descending()),
//                luckMangoId
//        );
//         page = 게시판 게시글 넘기는 페이지
//         size = 게시글 보여줄 갯수
    }

    // 복주머니 글 수정
    public LuckBag updateLuckBag(LuckBag luckBag){
        // update전 db에 같은 글이 있나 검증
        LuckBag findLuckBag = findVerifiedLuckBag(luckBag.getLuckBagId());

        Optional.ofNullable(luckBag.getLuckBagBody()).ifPresent(body -> findLuckBag.setLuckBagBody(body));
        Optional.ofNullable(luckBag.getWriter()).ifPresent(writer -> findLuckBag.setWriter(writer));
        Optional.ofNullable(luckBag.isViewed()).ifPresent(viewed -> findLuckBag.setViewed(viewed));
        Optional.ofNullable(luckBag.getBagStyle()).ifPresent(bagStyle -> findLuckBag.setBagStyle(bagStyle));
        Optional.ofNullable(luckBag.getBagColor()).ifPresent(bagColor -> findLuckBag.setBagColor(bagColor));

        findLuckBag.setModifiedAt(LocalDateTime.now());

        return luckBagRepository.save(findLuckBag);
    }

    //복주머니 삭제
    public void deleteLuckBag(long luckBagId){
        LuckBag findLuckBag = findVerifiedLuckBag(luckBagId);
        // 삭제 전 해당 아이디에 데이터가 있는지 확인
        luckBagRepository.delete(findLuckBag);
    }

    //복주머니 이미 DB에 있는지 확인
    private LuckBag findVerifiedLuckBag(Long luckBagId) {
        Optional<LuckBag> optionalLuckBag = luckBagRepository.findById(luckBagId);
        LuckBag findLuckBag =
                optionalLuckBag.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LUCKBAG_NOT_FOUND));
        return findLuckBag;
    }

    public int searchDayLuckBagsCount(String time1,String time2){


        return luckBagRepository.searchDayLuckBag(time1,time2);
    }
}
