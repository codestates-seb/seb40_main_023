package seb40.main023.server.luckBag.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40.main023.server.luckBag.dto.LuckBagPatchDto;
import seb40.main023.server.luckBag.dto.LuckBagPostDto;
import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
import seb40.main023.server.luckBag.entity.LuckBag;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-13T17:39:03+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class LuckBagMapperImpl implements LuckBagMapper {

    @Override
    public LuckBag luckBagPostToLuckBag(LuckBagPostDto luckBagPostDto) {
        if ( luckBagPostDto == null ) {
            return null;
        }

        LuckBag luckBag = new LuckBag();

        luckBag.setLuckBagId( luckBagPostDto.getLuckBagId() );
        luckBag.setBody( luckBagPostDto.getBody() );
        luckBag.setViewed( luckBagPostDto.isViewed() );
        luckBag.setWriter( luckBagPostDto.getWriter() );

        return luckBag;
    }

    @Override
    public LuckBag luckBagPatchToLuckBag(LuckBagPatchDto luckBagPatchDto) {
        if ( luckBagPatchDto == null ) {
            return null;
        }

        LuckBag luckBag = new LuckBag();

        luckBag.setLuckBagId( luckBagPatchDto.getLuckBagId() );
        luckBag.setBody( luckBagPatchDto.getBody() );
        luckBag.setViewed( luckBagPatchDto.isViewed() );
        luckBag.setWriter( luckBagPatchDto.getWriter() );

        return luckBag;
    }

    @Override
    public LuckBagResponseDto luckBagToLuckBagResponseDto(LuckBag luckBag) {
        if ( luckBag == null ) {
            return null;
        }

        LuckBagResponseDto luckBagResponseDto = new LuckBagResponseDto();

        luckBagResponseDto.setLuckBagId( luckBag.getLuckBagId() );
        luckBagResponseDto.setBody( luckBag.getBody() );
        luckBagResponseDto.setViewed( luckBag.isViewed() );
        luckBagResponseDto.setWriter( luckBag.getWriter() );

        return luckBagResponseDto;
    }

    @Override
    public List<LuckBagResponseDto> luckBagToLuckBagResponseDtos(List<LuckBag> luckBags) {
        if ( luckBags == null ) {
            return null;
        }

        List<LuckBagResponseDto> list = new ArrayList<LuckBagResponseDto>( luckBags.size() );
        for ( LuckBag luckBag : luckBags ) {
            list.add( luckBagToLuckBagResponseDto( luckBag ) );
        }

        return list;
    }
}
