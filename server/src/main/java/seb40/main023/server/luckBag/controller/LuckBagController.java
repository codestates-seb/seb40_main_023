package seb40.main023.server.luckBag.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.luckBag.dto.LuckBagPatchDto;
import seb40.main023.server.luckBag.dto.LuckBagPostDto;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckBag.mapper.LuckBagMapper;
import seb40.main023.server.luckBag.service.LuckBagService;
import seb40.main023.server.response.MultiResponseDto;
import seb40.main023.server.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/luckBag")
@Validated // 유효성 검사
@RequiredArgsConstructor  // autowired 사용 안해도 되게 해줌
@CrossOrigin // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용
public class LuckBagController {
    private final LuckBagService luckBagService;
    private final LuckBagMapper luckBagMapper;

    // 복주머니 생성의 경우 public 익명도 작성 가능해야하고, 조회도 가능해야하기 때문에
    // URL 을 어떻게 보여줄지 고민 필요.

    // Created 복주머니 생성
    @PostMapping //복주머니 만들기
    public ResponseEntity postLuckBag(@Valid @RequestBody LuckBagPostDto luckBagPostDto){
        LuckBag luckBag = luckBagService.createdLuckBag(luckBagMapper.luckBagPostDtoToLuckBag(luckBagPostDto));
        // 럭백 포스트Dto를 -> 럭백 mapper인터페이스로 변환해줬음.
        // 럭백 포스트 DTo 인스턴스를 -> 럭백포스트투럭백 메서드를 이용해서 럭백 인스턴스로 변환해줬다.
        // 변환 시켜주는 역할이 맵퍼
        // dto -> service + mapper + entity -> db -> front
        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)), HttpStatus.CREATED);
                // singleResponseDTo가 하는 역할이 아직도 모르겠다 , Multi도 마찬가지
    }

    // 복주머니번호로 찾기
    @GetMapping("/{luckBag-id}")
    public ResponseEntity getLuckBags(@PathVariable("luckBag-id") @Positive long luckBagId) {
        LuckBag luckBag = luckBagService.findLuckBag(luckBagId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)), HttpStatus.OK);
    }
//
//    // 복주머니 한개만 조회
//    @GetMapping("/{LuckBagId}")
//    public ResponseEntity findByIdLuckBag(@PathVariable("LuckBagId") Long luckBagId){
//
//        LuckBag findLuckBagId = luckBagService.findLuckBag(luckBagId);
//
//        return new ResponseEntity<>(new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(findLuckBagId)),
//                HttpStatus.OK);
//    }

    // 복주머니 글 전체 조회
    @GetMapping
    public ResponseEntity getLuckBags(@RequestParam("page") int page , @RequestParam("size") int size){
        Page<LuckBag> luckBagPage = luckBagService.findLuckBags(page - 1,size);
        List<LuckBag> luckBags = luckBagPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDtos(luckBags),
                        (luckBagPage)), HttpStatus.OK);
    }

    @GetMapping("/luckMango")
    public ResponseEntity getLuckBag(@RequestParam("luckMangoId") long luckMangoId,
                                     @RequestParam("page") int page ,
                                     @RequestParam("size") int size){
        Page<LuckBag> luckBagPage = luckBagService.findLuckBagList(luckMangoId,page - 1, size );
        List<LuckBag> luckBags = luckBagPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDtos(luckBags),
                        (luckBagPage)), HttpStatus.OK);
        // 프론트에 url 주소에 /luckMangoId를 추가해야 한다.
    }

    //복주머니 글 수정
    @PatchMapping("/{luckBag-id}") // 복주머니 글 수정
    public ResponseEntity patchLuckBag(@PathVariable("luckBag-id") @Positive long luckBagId ,
                                       @Valid @RequestBody LuckBagPatchDto luckBagPatchDto) {
        luckBagPatchDto.setLuckBagId(luckBagId);
        LuckBag luckBag = luckBagService.updateLuckBag(luckBagMapper.luckBagPatchDtoToLuckBag(luckBagPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)), HttpStatus.OK);
    }
    // 복주머니 삭제
    @DeleteMapping("/{luckBag-id}")
    public ResponseEntity deleteLuckBag(@PathVariable("luckBag-id") @Positive long luckBagId){

        luckBagService.deleteLuckBag(luckBagId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}