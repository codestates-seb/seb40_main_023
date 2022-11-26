package seb40.main023.server.luckMango.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40.main023.server.exception.BusinessLogicException;
import seb40.main023.server.exception.ExceptionCode;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.luckMango.repository.LuckMangoRepository;
import seb40.main023.server.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class LuckMangoService {
    private final LuckMangoRepository luckMangoRepository;
    private final MemberService memberService;

    //복망고 생성하기
    public LuckMango createLuckMango(LuckMango luckMango) {
        luckMango.setMember(memberService.findVerifiedMember(luckMango.getMember().getMemberId()));
        return luckMangoRepository.save(luckMango);
    }
    //특정 복망고 가져오기
    public LuckMango findLuckMango(long luckMangoId) {

        return findVerifiedLuckMango(luckMangoId);}

    //모든 복망고 가져오기
    public Page<LuckMango> findLuckMangos(int page, int size) {
        return luckMangoRepository.findAll(PageRequest.of(page, size,
                Sort.by("luckMangoId").descending()));
    }

    // 입력한 멤버 아이디를 가진 복망고 가져오기
    public Page<LuckMango> searchLuckMango(long memberId, int page, int size, String sort){
        PageRequest pageRequest = PageRequest.of(page,size,Sort.by("sort").descending());
        List<LuckMango> Result = luckMangoRepository.searchLuckMangoByMemberId(memberId);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), Result.size());
        Page<LuckMango> luckMangos = new PageImpl<>(Result.subList(start, end), pageRequest, Result.size());

        return luckMangos;
    }

    public Page<LuckMango> publicLuckMango(boolean reveal,int page, int size, String sort) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("likeCount").descending());
        List<LuckMango> Result = luckMangoRepository.searchLuckMangoByReveal(reveal);

        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), Result.size());
        Page<LuckMango> luckMangos = new PageImpl<>(Result.subList(start, end), pageRequest, Result.size());

        return luckMangos;
    }

    //복망고 수정하기
    public LuckMango updateLuckMango(LuckMango luckMango) {
        LuckMango findLuckMango = findVerifiedLuckMango(luckMango.getLuckMangoId());

        Optional.ofNullable(luckMango.getTitle())
                .ifPresent(title -> findLuckMango.setTitle(title));
        Optional.ofNullable(luckMango.getMangoBody())
                .ifPresent(mangoBody -> findLuckMango.setMangoBody(mangoBody));
        Optional.ofNullable(luckMango.getBgVideo())
                .ifPresent(bgVideo -> findLuckMango.setBgVideo(bgVideo));
        Optional.ofNullable(luckMango.getBgImage())
                .ifPresent(bgImage -> findLuckMango.setBgImage(bgImage));
        Optional.ofNullable(luckMango.isReveal())
                .ifPresent(reveal -> findLuckMango.setReveal(reveal));

        findLuckMango.setModifiedAt(LocalDateTime.now());

        return luckMangoRepository.save(findLuckMango);
    }

    //복망고 삭제하기
    public void deleteLuckMango (long luckMangoId){
        LuckMango luckMango = findVerifiedLuckMango(luckMangoId);
        luckMangoRepository.delete(luckMango);
    }

    public LuckMango findVerifiedLuckMango (long luckMangoId){
        Optional<LuckMango> optionalLuckMango = luckMangoRepository.findById(luckMangoId);
        LuckMango findLuckMango =
                optionalLuckMango.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LUCKMANGO_NOT_FOUND));
        return findLuckMango;
    }
}
