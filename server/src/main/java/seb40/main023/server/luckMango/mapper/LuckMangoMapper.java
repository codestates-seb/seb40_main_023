package seb40.main023.server.luckMango.mapper;

import org.mapstruct.Mapper;
import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LuckMangoMapper {
    LuckMango luckMangoPostDtoToluckMango(LuckMangoPostDto luckMangoPostDto);
    LuckMango luckMangoPatchDtoToluckMango(LuckMangoPatchDto luckMangoPatchDto);
    LuckMangoResponseDto luckMangoToLuckMangoResponseDto(LuckMango luckMango);
    List<LuckMangoResponseDto> luckMangoToLuckMangoResponseDtos(List<LuckMango> luckMangos);
}
