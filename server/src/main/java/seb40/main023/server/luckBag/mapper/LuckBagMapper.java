package seb40.main023.server.luckBag.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb40.main023.server.luckBag.dto.LuckBagPatchDto;
import seb40.main023.server.luckBag.dto.LuckBagPostDto;
import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
import seb40.main023.server.luckBag.entity.LuckBag;

import java.util.List;


@Mapper(componentModel = "spring")
public interface LuckBagMapper {
    LuckBag luckBagPostToLuckBag(LuckBagPostDto luckBagPostDto);  //post
    LuckBag luckBagPatchToLuckBag(LuckBagPatchDto luckBagPatchDto);  // patch

    LuckBagResponseDto luckBagToLuckBagResponseDto(LuckBag luckBag);

    List<LuckBagResponseDto> luckBagToLuckBagResponseDtos(List<LuckBag> luckBags);


}
