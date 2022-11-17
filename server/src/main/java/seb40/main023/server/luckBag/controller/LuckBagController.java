package seb40.main023.server.luckBag.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.luckBag.dto.LuckBagPatchDto;
import seb40.main023.server.luckBag.dto.LuckBagPostDto;
import seb40.main023.server.luckBag.entity.LuckBag;
import seb40.main023.server.luckBag.mapper.LuckBagMapper;
import seb40.main023.server.luckBag.response.MultiResponseDto;
import seb40.main023.server.luckBag.response.SingleResponseDto;
import seb40.main023.server.luckBag.service.LuckBagService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/luckBag")
@Validated // 유효성 검사
@Slf4j  // log
@RequiredArgsConstructor
public class LuckBagController {
    private final LuckBagService luckBagService;
    private final LuckBagMapper luckBagMapper;

    // Created 복주머니 생성
    @PostMapping //복주머니 만들기
    public ResponseEntity postLuckBag(@Valid @RequestBody LuckBagPostDto luckBagPostDto){
        LuckBag luckBag = luckBagService.createdLuckBag(luckBagMapper.luckBagPostDtoToLuckBag(luckBagPostDto));
        // 럭백 포스트Dto를 -> 럭백 mapper인터페이스로 변환해줬음.
        // 럭백 포스트 DTo 인스턴스를 -> 럭백포스트투럭백 메서드를 이용해서 럭백 인스턴스로 변환해줬다.
        // 변환 시켜주는 역할이 맵퍼

        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)),
                HttpStatus.CREATED);
                // singleResponseDTo를 인스턴스를 불러와 savedLuckBag을 저장한후 그 값을 프론트단에 반환 / 왜? 몰?루

    }

    //복주머니 글 수정
    @PatchMapping("/{luckBag-id}") // 복주머니 글 수정
    public ResponseEntity patchLuckBag(@PathVariable("luckBag-id") @Positive long luckBagId ,
                                       @Valid @RequestBody LuckBagPatchDto luckBagPatchDto){
        luckBagPatchDto.setLuckBagId(luckBagId);
        LuckBag luckBag = luckBagService.updateLuckBag(luckBagMapper.luckBagPatchDtoToLuckBag(luckBagPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)), HttpStatus.OK);
    }

    @GetMapping("/{luckBag-id}")
    public ResponseEntity getLuckBag(@PathVariable("luckBag-id") @Positive long luckBagId) {
        LuckBag luckBag = luckBagService.findLuckBag(luckBagId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDto(luckBag)), HttpStatus.OK);
    }


    // 복주머니 글 전체 조회
    @GetMapping
    public ResponseEntity getLuckBag(@PathVariable("page") int page ,
                                     @PathVariable("size") int size){
        Page<LuckBag> luckBagPage = luckBagService.findLuckBags(page - 1,size);
        List<LuckBag> luckBags = luckBagPage.getContent();
        
        return new ResponseEntity<>(
                new MultiResponseDto<>(luckBagMapper.luckBagToLuckBagResponseDtos(luckBags),
                        (luckBagPage)), HttpStatus.OK);
    }

    // 복주머니 삭제
    @DeleteMapping("/{luckBag-id}")
    public ResponseEntity deleteLuckBag(@PathVariable("luckBag-id") @Positive long luckBagId){

        luckBagService.deleteLuckBag(luckBagId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

