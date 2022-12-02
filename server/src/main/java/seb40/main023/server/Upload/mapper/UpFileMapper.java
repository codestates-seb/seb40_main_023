package seb40.main023.server.Upload.mapper;

import org.mapstruct.Mapper;
import seb40.main023.server.Upload.dto.UpFilePatchDto;
import seb40.main023.server.Upload.dto.UpFilePostDto;
import seb40.main023.server.Upload.dto.UpFileResponse;
import seb40.main023.server.Upload.entity.UpFile;
import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
import seb40.main023.server.luckMango.entity.LuckMango;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UpFileMapper {
    UpFile upFilePostDtoToupFile(UpFilePostDto upFilePostDto);
    UpFile upFilePatchDtoToupFile(UpFilePatchDto upFilePatchDto);
    UpFileResponse upFileToUpFileResponse(UpFile upFile);

}
