package seb40.main023.server.restdocs.luckMango;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import seb40.main023.server.luckMango.controller.LuckMangoController;
import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.luckMango.mapper.LuckMangoMapper;
import seb40.main023.server.luckMango.service.LuckMangoService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static Singleton.server.util.ApiDocumentUtils.getRequestPreProcessor;
import static Singleton.server.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LuckMangoController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class LuckMangoControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LuckMangoService luckMangoService;

    @MockBean
    private LuckMangoMapper luckMangoMapper;

    @Autowired
    private Gson gson;


    @Test
    public void postLuckMangoTest() throws Exception {
        // given
        LuckMangoPostDto post = LuckMangoPostDto.builder()
                .memberId(1L)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("제목")
                .build();

        LuckMangoResponseDto luckMangoResponseDto =
                LuckMangoResponseDto.builder()
                        .memberId(1L)
                        .luckMangoId(1L)
                        .bgImage("bg.jpg")
                        .bgVideo("bgVideo.mp")
                        .title("제목")
                        .likeCount(0)
                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .build();

        String luckMango = gson.toJson(post);

        given(luckMangoMapper.luckMangoPostDtoToluckMango(Mockito.any(LuckMangoPostDto.class))).willReturn(Mockito.mock(LuckMango.class));
        given(luckMangoService.createLuckMango(Mockito.any(LuckMango.class))).willReturn(Mockito.mock(LuckMango.class));
        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(luckMangoResponseDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/v1/luckMango")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(luckMango));

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.memberId").value(post.getMemberId()))
                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
                .andExpect(jsonPath("$.data.bgImage").value(post.getBgImage()))
                .andExpect(jsonPath("$.data.bgVideo").value(post.getBgVideo()))
                .andDo(document("post-luckMango",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시")
                                )
                        )
                ));

    }

    @Test
    public void patchLuckMangoTest() throws Exception{
        // given
        long luckMango_Id = 1L;
        LuckMangoPatchDto patch = LuckMangoPatchDto.builder()
                .luckMangoId(luckMango_Id)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("제목")
                .likeCount(0)
                .build();

        LuckMangoResponseDto luckMangoResponseDto =
                LuckMangoResponseDto.builder()
                        .memberId(1L)
                        .luckMangoId(luckMango_Id)
                        .bgImage("bg.jpg")
                        .bgVideo("bgVideo.mp")
                        .title("제목")
                        .likeCount(0)
                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .build();

        String luckMango = gson.toJson(patch);

        given(luckMangoMapper.luckMangoPatchDtoToluckMango(Mockito.any(LuckMangoPatchDto.class))).willReturn(Mockito.mock(LuckMango.class));
        given(luckMangoService.updateLuckMango(Mockito.any(LuckMango.class))).willReturn(Mockito.mock(LuckMango.class));
        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(luckMangoResponseDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        patch("/v1/luckMango/{luckMango-id}",1,luckMango_Id)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(luckMango));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.luckMangoId").value(patch.getLuckMangoId()))
                .andExpect(jsonPath("$.data.title").value(patch.getTitle()))
                .andExpect(jsonPath("$.data.bgImage").value(patch.getBgImage()))
                .andExpect(jsonPath("$.data.bgVideo").value(patch.getBgVideo()))
                .andExpect(jsonPath("$.data.likeCount").value(patch.getLikeCount()))
                .andDo(document("patch-luckMango",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("luckMangoId").type(JsonFieldType.NUMBER).description("복망고번호"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("좋아요수")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시")
                                )
                        )
                ));

    }

    @Test
    public void getLuckMangoTest() throws Exception {
        // given
        long luckMangoId = 1L;
        LuckMangoResponseDto responseDto =
                LuckMangoResponseDto.builder()
                        .memberId(1L)
                        .luckMangoId(luckMangoId)
                        .bgImage("bg.jpg")
                        .bgVideo("bgVideo.mp")
                        .title("제목")
                        .likeCount(0)
                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                        .build();

        String content = gson.toJson(responseDto);
        given(luckMangoService.findLuckMango(luckMangoId)).willReturn(Mockito.mock(LuckMango.class));
        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(responseDto);
        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/v1/luckMango/{luckMango-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
                );
        // then
        actions.andExpect(status().isOk())
                .andDo(document("get-luckMango",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("luckMangoId").type(JsonFieldType.NUMBER).description("복망고번호"),
//                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일시")
//                                )
//                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시")
                                )
                        )
                ));

    }

    @Test
    public void getLuckMangosTest() throws Exception {
        // given
        int page = 1;
        int size = 10;

        LuckMango luckMango1 = new LuckMango();
        luckMango1.setLuckMangoId(1L);
        luckMango1.setMember(null);
        luckMango1.setBgVideo("동영상");
        luckMango1.setBgImage("배경그림");
        luckMango1.setTitle("복망고 타이틀");

        LuckMango luckMango2 = new LuckMango();
        luckMango2.setLuckMangoId(2L);
        luckMango2.setMember(null);
        luckMango2.setBgVideo("동영상");
        luckMango2.setBgImage("배경그림");
        luckMango2.setTitle("복망고 타이틀");

        List<LuckMango> luckMangos = new ArrayList<>();
        luckMangos.add(luckMango1);
        luckMangos.add(luckMango2);

        Page<LuckMango> pageLuckMango = new PageImpl<>(luckMangos);

        LuckMangoResponseDto responseDto1 = LuckMangoResponseDto.builder()
                .memberId(1L)
                .luckMangoId(1L)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("회원 1의 1번 복망고")
                .likeCount(0)
                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .build();

        LuckMangoResponseDto responseDto2 = LuckMangoResponseDto.builder()
                .memberId(2L)
                .luckMangoId(2L)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("회원 2번의 1번 복망고")
                .likeCount(0)
                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .build();

        List<LuckMangoResponseDto> luckMangoResponseDtos = List.of(responseDto1, responseDto2);

        given(luckMangoService.findLuckMangos(Mockito.anyInt(),Mockito.anyInt())).willReturn(pageLuckMango);
        given(luckMangoMapper.luckMangoToLuckMangoResponseDtos(Mockito.any(List.class))).willReturn(luckMangoResponseDtos);
        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/v1/luckMango?page={page}&size={size}",1,10,page,size)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-MeberLuckMango",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("현재 페이지"),
                                parameterWithName("size").description("페이지당 갯수")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("data[].luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("data[].bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("data[].bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("data[].likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성일시"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지당 갯수"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("후기 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지수")
                                )
                        )
                ));
    }

    @Test
    public void getMemberLuckMangoTest() throws Exception {
        // given
        int page = 1;
        int size = 10;
        long memberId = 1L;
        String sort = "desc";

        LuckMango luckMango1 = new LuckMango();
        luckMango1.setLuckMangoId(1L);
        luckMango1.setMember(null);
        luckMango1.setBgVideo("동영상");
        luckMango1.setBgImage("배경그림");
        luckMango1.setTitle("복망고 타이틀");

        LuckMango luckMango2 = new LuckMango();
        luckMango2.setLuckMangoId(2L);
        luckMango2.setMember(null);
        luckMango2.setBgVideo("동영상");
        luckMango2.setBgImage("배경그림");
        luckMango2.setTitle("복망고 타이틀");

        List<LuckMango> luckMangos = new ArrayList<>();
        luckMangos.add(luckMango1);
        luckMangos.add(luckMango2);

        PageRequest pageRequest = PageRequest.of(page,size,Sort.by(sort).descending());
        Page<LuckMango> pageLuckMango = new PageImpl<>(luckMangos);

        LuckMangoResponseDto responseDto1 = LuckMangoResponseDto.builder()
                .memberId(1L)
                .luckMangoId(1L)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("회원 1의 1번 복망고")
                .likeCount(0)
                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .build();

        LuckMangoResponseDto responseDto2 = LuckMangoResponseDto.builder()
                .memberId(1L)
                .luckMangoId(5L)
                .bgImage("bg.jpg")
                .bgVideo("bgVideo.mp")
                .title("회원 1번의 2번 복망고")
                .likeCount(0)
                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
                .build();



        List<LuckMangoResponseDto> luckMangoResponseDtos = List.of(responseDto1, responseDto2);

        given(luckMangoService.searchLuckMango(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt(),Mockito.anyString())).willReturn(pageLuckMango);
        given(luckMangoMapper.luckMangoToLuckMangoResponseDtos(Mockito.any(List.class))).willReturn(luckMangoResponseDtos);
        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/v1/luckMango/member?memberId={memberId}&page={page}&size={size}&sort=desc",1L,1,10,memberId,page,size)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-luckMangos",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("memberId").description("회원ID"),
                                parameterWithName("page").description("현재 페이지"),
                                parameterWithName("size").description("페이지당 갯수"),
                                parameterWithName("sort").description("정렬")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
                                        fieldWithPath("data[].luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("data[].bgImage").type(JsonFieldType.STRING).description("배경이미지"),
                                        fieldWithPath("data[].bgVideo").type(JsonFieldType.STRING).description("동영상"),
                                        fieldWithPath("data[].likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성일시"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지당 갯수"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("후기 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지수")
                                )
                        )
                ));
    }


    @Test
    public void deleteLuckMangoTest() throws Exception {
        // given
        long luckMangoId= 1L;

        // when
        ResultActions actions =
                mockMvc.perform(
                        delete("/v1/luckMango/{luckMango-id}",1L,luckMangoId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON));
        // then
        MvcResult result = actions.andExpect(status().isNoContent())
                .andDo(
                        document("delete-luckMango")).andReturn();
    }
}
