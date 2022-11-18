package seb40.main023.server.luckBag.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckBag.repository.LuckBagRepository;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class LuckBagService {

    private final LuckBagRepository luckBagRepository;

    // C 복주머니 생성
    public LuckBag createdLuckBag(LuckBag luckBag){

        return luckBagRepository.save(luckBag);
        // 럭백을 세이브 메소드를 이용해서 리파지토리로 넣어주세요 하는 결과가 나온다.
    }

     //복주머니 전체 조회 페이지
    public Page<LuckBag> findLuckBagList( long luckMangoId, int page, int size){

        PageRequest pageRequest = PageRequest.of(page,size,Sort.by("luckBagId").descending());
        List<LuckBag> Result = luckBagRepository.searchLuckBagByLuckMango(luckMangoId);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), Result.size());
        Page<LuckBag> luckBag = new PageImpl<>(Result.subList(start, end), pageRequest, Result.size());

        return luckBag;

        //        이전에 짰던거
//        return luckBagRepository.findByLuckMangoId(
//                PageRequest.of(page, size,Sort.by("luckBagId").descending()),
//                luckMangoId
//        );
//         page = 게시판 게시글 넘기는 페이지
//         size = 게시글 보여줄 갯수
//

    }

//    복주머니 하나만 조회
    public LuckBag findByIdLuckBag(Long luckBagId){

            Optional<LuckBag> entityOptional = luckBagRepository.findById(luckBagId);

        LuckBag findLuckBagId =
                entityOptional.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LUCKMANGO_NOT_FOUND));
        return findLuckBagId;
    }

    //optional.isPresent() : 여기에 객체가 존재하는가 /  / boolean 타입으로 반환
    // get()

    // 복주머니 글 수정
    public LuckBag patchLuckBag(LuckBag luckBag){

        // update전 db에 같은 글이 있나 검증
        LuckBag findDeleteLuckBag = verifyLuckBagUsingId(luckBag.getLuckBagId());

        Optional.ofNullable(luckBag.getBody())
                .ifPresent(body -> findDeleteLuckBag.setBody(body));
        Optional.ofNullable(luckBag.getWriter())
                .ifPresent(writer -> findDeleteLuckBag.setWriter(writer));
        Optional.ofNullable(luckBag.getBagStyle())
                .ifPresent(bagStyle -> findDeleteLuckBag.setBagStyle(bagStyle));

        return luckBagRepository.save(findDeleteLuckBag);

    }

    //복주머니 삭제

    public void deleteLuckBag(long luckBagId){
        LuckBag luckBag = verifyLuckBagUsingId(luckBagId);
        // 삭제 전 해당 아이디에 데이터가 있는지 확인

        luckBagRepository.delete(luckBag);

    }


    //복주머니 이미 DB에 있는지 확인
    private LuckBag verifyLuckBagUsingId(Long luckBagId){
        Optional<LuckBag> optionalLuckBag = luckBagRepository.findById(luckBagId);
        LuckBag luckbag =
                optionalLuckBag.orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.LUCKBAG_NOT_FOUND));
        return luckbag;
    }
}
