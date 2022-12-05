//package seb40.main023.server.restdocs.luckMango;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//import seb40.main023.server.luckMango.controller.LuckMangoController;
//import seb40.main023.server.luckMango.dto.LuckMangoPatchDto;
//import seb40.main023.server.luckMango.dto.LuckMangoPostDto;
//import seb40.main023.server.luckMango.dto.LuckMangoResponseDto;
//import seb40.main023.server.luckMango.entity.LuckMango;
//import seb40.main023.server.luckMango.mapper.LuckMangoMapper;
//import seb40.main023.server.luckMango.service.LuckMangoService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.test.web.servlet.MockMvc;
//import seb40.main023.server.member.dto.MemberResponseDto_Mango;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.request.RequestDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.restdocs.util.ApiDocumentUtils.getRequestPreProcessor;
//import static seb40.main023.server.restdocs.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(LuckMangoController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class LuckMangoControllerRestDocsTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private LuckMangoService luckMangoService;
//
//    @MockBean
//    private LuckMangoMapper luckMangoMapper;
//
//    @Autowired
//    private Gson gson;
//
//
//    @Test
//    public void postLuckMangoTest() throws Exception {
//        // given
//        LuckMangoPostDto post = LuckMangoPostDto.builder()
//                .memberId(1L)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .mangoBody("내용")
//                .title("제목")
//                .reveal(true)
//                .build();
//
//
//        LuckMangoResponseDto luckMangoResponseDto =
//                LuckMangoResponseDto.builder()
//                        .luckMangoId(1L)
//                        .bgImage("bg.jpg")
//                        .bgVideo("bgVideo.mp4")
//                        .title("제목")
//                        .mangoBody("내용")
//                        .likeCount(0)
//                        .reveal(true)
//                        .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .build();
//
//        String luckMango = gson.toJson(post);
//
//        given(luckMangoMapper.luckMangoPostDtoToluckMango(Mockito.any(LuckMangoPostDto.class))).willReturn(Mockito.mock(LuckMango.class));
//        given(luckMangoService.createLuckMango(Mockito.any(LuckMango.class))).willReturn(Mockito.mock(LuckMango.class));
//        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(luckMangoResponseDto);
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/luckMango")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(luckMango));
//
//        // then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
//                .andExpect(jsonPath("$.data.bgImage").value(post.getBgImage()))
//                .andExpect(jsonPath("$.data.bgVideo").value(post.getBgVideo()))
//                .andExpect(jsonPath("$.data.mangoBody").value(post.getMangoBody()))
//                .andExpect(jsonPath("$.data.reveal").value(true))
//                .andDo(document("post-luckMango",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("reveal").type(JsonFieldType.BOOLEAN).description("true")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
//                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("data.mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
//                                        fieldWithPath("data.reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨"),
//                                        fieldWithPath("data.member").type(JsonFieldType.OBJECT).description("멤버 데이터"),
//                                        fieldWithPath("data.member.memberId").type(JsonFieldType.NUMBER).description("멤버 번호"),
//                                        fieldWithPath("data.member.name").type(JsonFieldType.STRING).description("멤버 아이디"),
//                                        fieldWithPath("data.member.email").type(JsonFieldType.STRING).description("멤버 이메일"),
//                                        fieldWithPath("data.member.imgUrl").type(JsonFieldType.STRING).description("멤버 이미지")
//                                )
//                        )
//                ));
//
//    }
//
//    @Test
//    public void patchLuckMangoTest() throws Exception{
//        // given
//        long luckMango_Id = 1L;
//        LuckMangoPatchDto patch = LuckMangoPatchDto.builder()
//                .luckMangoId(luckMango_Id)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .title("제목")
//                .mangoBody("수정된 내용")
//                .likeCount(0)
//                .reveal("공개여부 값 :'true'인 경우만 공개됨 ")
//                .build();
//
//        LuckMangoResponseDto luckMangoResponseDto =
//                LuckMangoResponseDto.builder()
//                        .luckMangoId(luckMango_Id)
//                        .bgImage("bg.jpg")
//                        .bgVideo("bgVideo.mp4")
//                        .title("제목")
//                        .mangoBody("수정된 내용")
//                        .likeCount(0)
//                        .reveal("공개여부 값 :'true'인 경우만 공개됨 ")
//                        .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .build();
//
//        String luckMango = gson.toJson(patch);
//
//        given(luckMangoMapper.luckMangoPatchDtoToluckMango(Mockito.any(LuckMangoPatchDto.class))).willReturn(Mockito.mock(LuckMango.class));
//        given(luckMangoService.updateLuckMango(Mockito.any(LuckMango.class))).willReturn(Mockito.mock(LuckMango.class));
//        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(luckMangoResponseDto);
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        patch("/luckMango/{luckMango-id}",1,luckMango_Id)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(luckMango));
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.luckMangoId").value(patch.getLuckMangoId()))
//                .andExpect(jsonPath("$.data.title").value(patch.getTitle()))
//                .andExpect(jsonPath("$.data.bgImage").value(patch.getBgImage()))
//                .andExpect(jsonPath("$.data.bgVideo").value(patch.getBgVideo()))
//                .andExpect(jsonPath("$.data.likeCount").value(patch.getLikeCount()))
//                .andExpect(jsonPath("$.data.mangoBody").value(patch.getMangoBody()))
//                .andExpect(jsonPath("$.data.reveal").value(patch.getReveal()))
//                .andDo(document("patch-luckMango",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("luckMangoId").type(JsonFieldType.NUMBER).description("복망고번호"),
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("mangoBody").type(JsonFieldType.STRING).description("수정된 내용"),
//                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
//                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("data.mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
//                                        fieldWithPath("data.reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨"),
//                                        fieldWithPath("data.member").type(JsonFieldType.OBJECT).description("멤버 데이터"),
//                                        fieldWithPath("data.member.memberId").type(JsonFieldType.NUMBER).description("멤버 번호"),
//                                        fieldWithPath("data.member.name").type(JsonFieldType.STRING).description("멤버 아이디"),
//                                        fieldWithPath("data.member.email").type(JsonFieldType.STRING).description("멤버 이메일"),
//                                        fieldWithPath("data.member.imgUrl").type(JsonFieldType.STRING).description("멤버 이미지")
//                                )
//                        )
//                ));
//
//    }
//
//    @Test
//    public void getLuckMangoTest() throws Exception {
//        // given
//        long luckMangoId = 1L;
//        LuckMangoResponseDto responseDto =
//                LuckMangoResponseDto.builder()
//                        .luckMangoId(luckMangoId)
//                        .bgImage("bg.jpg")
//                        .bgVideo("bgVideo.mp4")
//                        .title("제목")
//                        .mangoBody("수정된 내용")
//                        .likeCount(0)
//                        .reveal("공개여부 값 :'true'인 경우만 공개됨 ")
//                        .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                        .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                        .build();
//
//        String content = gson.toJson(responseDto);
//        given(luckMangoService.findLuckMango(luckMangoId)).willReturn(Mockito.mock(LuckMango.class));
//        given(luckMangoMapper.luckMangoToLuckMangoResponseDto(Mockito.any(LuckMango.class))).willReturn(responseDto);
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/luckMango/{luckMango-id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(content)
//                );
//        // then
//        actions.andExpect(status().isOk())
//                .andDo(document("get-luckMango",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
////                        requestFields(
////                                List.of(
////                                        fieldWithPath("luckMangoId").type(JsonFieldType.NUMBER).description("복망고번호"),
////                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버번호"),
////                                        fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
////                                        fieldWithPath("bgImage").type(JsonFieldType.STRING).description("배경이미지"),
////                                        fieldWithPath("bgVideo").type(JsonFieldType.STRING).description("동영상"),
////                                        fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
////                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성일시"),
////                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정일시")
////                                )
////                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
//                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("data.mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("data.bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("data.bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
//                                        fieldWithPath("data.reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨"),
//                                        fieldWithPath("data.member").type(JsonFieldType.OBJECT).description("멤버 데이터"),
//                                        fieldWithPath("data.member.memberId").type(JsonFieldType.NUMBER).description("멤버 번호"),
//                                        fieldWithPath("data.member.name").type(JsonFieldType.STRING).description("멤버 아이디"),
//                                        fieldWithPath("data.member.email").type(JsonFieldType.STRING).description("멤버 이메일"),
//                                        fieldWithPath("data.member.imgUrl").type(JsonFieldType.STRING).description("멤버 이미지")
//                                )
//                        )
//                ));
//
//    }
//
//    @Test
//    public void getLuckMangosTest() throws Exception {
//        // given
//        int page = 1;
//        int size = 10;
//
//        LuckMango luckMango1 = new LuckMango();
//        luckMango1.setLuckMangoId(1L);
//        luckMango1.setMember(null);
//        luckMango1.setBgVideo("동영상");
//        luckMango1.setBgImage("배경그림");
//        luckMango1.setTitle("복망고 타이틀");
//
//        LuckMango luckMango2 = new LuckMango();
//        luckMango2.setLuckMangoId(2L);
//        luckMango2.setMember(null);
//        luckMango2.setBgVideo("동영상");
//        luckMango2.setBgImage("배경그림");
//        luckMango2.setTitle("복망고 타이틀");
//
//        List<LuckMango> luckMangos = new ArrayList<>();
//        luckMangos.add(luckMango1);
//        luckMangos.add(luckMango2);
//
//        Page<LuckMango> pageLuckMango = new PageImpl<>(luckMangos);
//
//        LuckMangoResponseDto responseDto1 = LuckMangoResponseDto.builder()
//                .luckMangoId(1L)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .title("회원 1번의 1번 복망고")
//                .mangoBody("내용")
//                .likeCount(0)
//                .reveal("true")
//                .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .build();
//
//        LuckMangoResponseDto responseDto2 = LuckMangoResponseDto.builder()
//                .luckMangoId(2L)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .title("회원 2번의 1번 복망고")
//                .mangoBody("내용")
//                .likeCount(0)
//                .reveal("true")
//                .member(new MemberResponseDto_Mango(2L,"유저아이디","test2@gmail.com","http://aa.aa.com"))
//                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .build();
//
//        List<LuckMangoResponseDto> luckMangoResponseDtos = List.of(responseDto1, responseDto2);
//
//        given(luckMangoService.findLuckMangos(Mockito.anyInt(),Mockito.anyInt())).willReturn(pageLuckMango);
//        given(luckMangoMapper.luckMangoToLuckMangoResponseDtos(Mockito.any(List.class))).willReturn(luckMangoResponseDtos);
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/luckMango?page={page}&size={size}",1,10,page,size)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
////                                .content(content)
//                );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("get-MeberLuckMango",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestParameters(
//                                parameterWithName("page").description("현재 페이지"),
//                                parameterWithName("size").description("페이지당 갯수")
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data[].luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
//                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("data[].mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("data[].bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("data[].bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("data[].likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
//                                        fieldWithPath("data[].reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨"),
//                                        fieldWithPath("data[].member").type(JsonFieldType.OBJECT).description("멤버 데이터"),
//                                        fieldWithPath("data[].member.memberId").type(JsonFieldType.NUMBER).description("멤버 번호"),
//                                        fieldWithPath("data[].member.name").type(JsonFieldType.STRING).description("멤버 아이디"),
//                                        fieldWithPath("data[].member.email").type(JsonFieldType.STRING).description("멤버 이메일"),
//                                        fieldWithPath("data[].member.imgUrl").type(JsonFieldType.STRING).description("멤버 이미지"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지당 갯수"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("복망고 총 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지수")
//                                )
//                        )
//                ));
//    }
//
//    @Test
//    public void getMemberLuckMangoTest() throws Exception {
//        // given
//        int page = 1;
//        int size = 10;
//        long memberId = 1L;
//        String sort = "desc";
//
//        LuckMango luckMango1 = new LuckMango();
//        luckMango1.setLuckMangoId(1L);
//        luckMango1.setMember(null);
//        luckMango1.setBgVideo("동영상");
//        luckMango1.setBgImage("배경그림");
//        luckMango1.setTitle("복망고 타이틀");
//
//        LuckMango luckMango2 = new LuckMango();
//        luckMango2.setLuckMangoId(2L);
//        luckMango2.setMember(null);
//        luckMango2.setBgVideo("동영상");
//        luckMango2.setBgImage("배경그림");
//        luckMango2.setTitle("복망고 타이틀");
//
//        List<LuckMango> luckMangos = new ArrayList<>();
//        luckMangos.add(luckMango1);
//        luckMangos.add(luckMango2);
//
//        PageRequest pageRequest = PageRequest.of(page,size,Sort.by(sort).descending());
//        Page<LuckMango> pageLuckMango = new PageImpl<>(luckMangos);
//
//        LuckMangoResponseDto responseDto1 = LuckMangoResponseDto.builder()
//                .luckMangoId(1L)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .title("회원 1번의 1번 복망고")
//                .mangoBody("내용")
//                .likeCount(0)
//                .reveal("true")
//                .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .build();
//
//        LuckMangoResponseDto responseDto2 = LuckMangoResponseDto.builder()
//                .luckMangoId(1L)
//                .bgImage("bg.jpg")
//                .bgVideo("bgVideo.mp4")
//                .title("회원 1번의 2번 복망고")
//                .mangoBody("내용")
//                .likeCount(0)
//                .reveal("null")
//                .member(new MemberResponseDto_Mango(1L,"유저아이디","test@gmail.com","http://aa.aa.com"))
//                .createdAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .modifiedAt(LocalDateTime.of(2022, 10, 31, 10, 0, 0))
//                .build();
//
//
//
//        List<LuckMangoResponseDto> luckMangoResponseDtos = List.of(responseDto1, responseDto2);
//
//        given(luckMangoService.searchLuckMango(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt(),Mockito.anyString())).willReturn(pageLuckMango);
//        given(luckMangoMapper.luckMangoToLuckMangoResponseDtos(Mockito.any(List.class))).willReturn(luckMangoResponseDtos);
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/luckMango/member?memberId={memberId}&page={page}&size={size}&sort=desc",1L,1,10,memberId,page,size)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
////                                .content(content)
//                );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("get-luckMangos",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestParameters(
//                                parameterWithName("memberId").description("회원ID"),
//                                parameterWithName("page").description("현재 페이지"),
//                                parameterWithName("size").description("페이지당 갯수"),
//                                parameterWithName("sort").description("정렬")
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data[].luckMangoId").type(JsonFieldType.NUMBER).description("복망고 아이디"),
//                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("제목"),
//                                        fieldWithPath("data[].mangoBody").type(JsonFieldType.STRING).description("내용"),
//                                        fieldWithPath("data[].bgImage").type(JsonFieldType.STRING).description("배경이미지"),
//                                        fieldWithPath("data[].bgVideo").type(JsonFieldType.STRING).description("동영상"),
//                                        fieldWithPath("data[].likeCount").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성일시"),
//                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정일시"),
//                                        fieldWithPath("data[].reveal").type(JsonFieldType.STRING).description("공개여부 값 :'true'인 경우만 공개됨"),
//                                        fieldWithPath("data[].member").type(JsonFieldType.OBJECT).description("멤버 데이터"),
//                                        fieldWithPath("data[].member.memberId").type(JsonFieldType.NUMBER).description("멤버 번호"),
//                                        fieldWithPath("data[].member.name").type(JsonFieldType.STRING).description("멤버 아이디"),
//                                        fieldWithPath("data[].member.email").type(JsonFieldType.STRING).description("멤버 이메일"),
//                                        fieldWithPath("data[].member.imgUrl").type(JsonFieldType.STRING).description("멤버 이미지"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지당 갯수"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("복망고 총 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지수")
//                                )
//                        )
//                ));
//    }
//
//
//    @Test
//    public void deleteLuckMangoTest() throws Exception {
//        // given
//        long luckMangoId= 1L;
//
//        // when
//        ResultActions actions =
//                mockMvc.perform(
//                        delete("/luckMango/{luckMango-id}",1L,luckMangoId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON));
//        // then
//        MvcResult result = actions.andExpect(status().isNoContent())
//                .andDo(
//                        document("delete-luckMango")).andReturn();
//    }
//}
