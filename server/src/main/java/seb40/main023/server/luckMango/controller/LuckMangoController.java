package seb40.main023.server.luckMango.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.luckMango.mapper.LuckMangoMapper;
import seb40.main023.server.luckMango.service.LuckMangoService;
import seb40.main023.server.response.MultiResponseDto;
import seb40.main023.server.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/luckMango")
@Validated
@RequiredArgsConstructor
@CrossOrigin // 웹 페이지의 제한된 자원을 외부 도메인에서 접근을 허용
public class LuckMangoController {
    private final LuckMangoService luckMangoService;
    private final LuckMangoMapper luckMangoMapper;

    //복망고 생성
    @PostMapping
    public ResponseEntity postLuckMango(@Valid @RequestBody LuckMangoPostDto luckMangoPostDto) {
        LuckMango luckMango = luckMangoService.createLuckMango(luckMangoMapper.luckMangoPostDtoToluckMango(luckMangoPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDto(luckMango)),
                HttpStatus.CREATED);
    }

    //복망고 수정
    @PatchMapping("/{luckMango-id}")
    public ResponseEntity patchLuckMango(@PathVariable("luckMango-id") long luckMangoId,
                                       @Valid @RequestBody LuckMangoPatchDto luckMangoPatchDto) {
        luckMangoPatchDto.setLuckMangoId(luckMangoId);
        LuckMango luckMango = luckMangoService.updateLuckMango(luckMangoMapper.luckMangoPatchDtoToluckMango(luckMangoPatchDto));
//        long memberId = content.getMemberId();   // 멤버 아이디가 동일하지 않으면 수정 불가
//        if(nowMemberId != memberId){return new ResponseEntity(HttpStatus.BAD_REQUEST);}

        return new ResponseEntity<>(
                new SingleResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDto(luckMango)),HttpStatus.OK);
    }

    //복망고번호로 찾기
    @GetMapping("/{luckMango-id}")
    public ResponseEntity getLuckMango(@PathVariable("luckMango-id") @Positive long luckMangoId){
        LuckMango luckMango = luckMangoService.findLuckMango(luckMangoId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDto(luckMango)), HttpStatus.OK);
    }

    //회원이 가진 복망고 출력하기
    @GetMapping("/member")
    public ResponseEntity getMemberLuckMango(@Positive @RequestParam("memberId") long memberId,@Positive @RequestParam("page") int page,
                                            @Positive @RequestParam("size") int size,@RequestParam ("sort") String sort) {
        Page<LuckMango> pageLuckMangos = luckMangoService.searchLuckMango(memberId,page - 1, size,sort);
        List<LuckMango> luckMangos = pageLuckMangos.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDtos(luckMangos),
                        pageLuckMangos), HttpStatus.OK);
    }

    //모든 복망고 가져오기
    @GetMapping
    public ResponseEntity getLuckMangos(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        Page<LuckMango> pageLuckMangos = luckMangoService.findLuckMangos(page - 1, size);
        List<LuckMango> luckMangos = pageLuckMangos.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDtos(luckMangos),
                        pageLuckMangos), HttpStatus.OK);
    }

    //공개복망고 가져오기
    @GetMapping("/public")
    public ResponseEntity getPublicLuckMangos(@RequestParam("reveal") boolean reveal,@Positive @RequestParam int page,
                                        @Positive @RequestParam int size, @RequestParam ("sort") String sort) {
        Page<LuckMango> pageLuckMangos = luckMangoService.publicLuckMango(reveal, page - 1, size,sort);
        List<LuckMango> luckMangos = pageLuckMangos.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDtos(luckMangos),
                        pageLuckMangos), HttpStatus.OK);
    }

    @GetMapping("/public/like")
    public ResponseEntity getPublicLuckMangoslike(@RequestParam("reveal") boolean reveal,@Positive @RequestParam int page,
                                              @Positive @RequestParam int size, @RequestParam ("sort") String sort) {
        Page<LuckMango> pageLuckMangos = luckMangoService.publicLuckMangoLike(reveal, page - 1, size,sort);
        List<LuckMango> luckMangos = pageLuckMangos.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(luckMangoMapper.luckMangoToLuckMangoResponseDtos(luckMangos),
                        pageLuckMangos), HttpStatus.OK);
    }



    //복망고 삭제하기
    @DeleteMapping("/{luckMango-id}")
    public ResponseEntity deleteLuckMango(@PathVariable("luckMango-id") long luckMangoId){
//        Content content = contentService.findContent(contentId);      // 현재멤버아이디가 동일하지 않으면 삭제 안됨
//        long memberId = content.getMemberId();
//        if(nowMemberId != memberId){return new ResponseEntity(HttpStatus.BAD_REQUEST);}
        luckMangoService.deleteLuckMango(luckMangoId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
