//package seb40.main023.server.restdocs.member;
//
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import seb40.main023.server.member.controller.MemberController;
//import seb40.main023.server.member.dto.MemberPatchDto;
//import seb40.main023.server.member.dto.MemberPostDto;
//import seb40.main023.server.member.dto.MemberResponseDto;
//import seb40.main023.server.member.entity.Member;
//import seb40.main023.server.member.mapper.MemberMapper;
//import seb40.main023.server.member.service.MemberService;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.member.entity.MemberStatus.MEMBER_ACTIVE;
//import static seb40.main023.server.restdocs.util.ApiDocumentUtils.getRequestPreProcessor;
//import static seb40.main023.server.restdocs.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(MemberController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class MemberControllerRestDocsTest {
//    @MockBean
//    private MemberService memberService;
//
//    @MockBean
//    private MemberMapper memberMapper;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @Test
//    public void Member_Post_Test() throws Exception {
//        // Given
//        MemberPostDto memberPostDto = MemberPostDto.builder()
//                .name("hgd")
//                .email("hgd@gmail.com")
//                .password("qwer1234")
//                .imgUrl("imgURL")
//                .build();
//
//        String content = gson.toJson(memberPostDto);
//
//        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
//                .memberId(1L)
//                .name("hgd")
//                .email("hgd@gmail.com")
//                .password("qwer1234")
//                .imgUrl("imgURL")
//                .tot_Money(0)
//                .memberStatus(MEMBER_ACTIVE)
//                .createdAt(LocalDateTime.now())
//                .modifiedAt(LocalDateTime.now())
//                .build();
//
//        // MemberPostDto -> Member
//        given(memberMapper.memberPostToMember(any(MemberPostDto.class))).willReturn(Mockito.mock(Member.class));
//
//        // MemberService
//        given(memberService.createMember(any(Member.class))).willReturn(Mockito.mock(Member.class));
//
//        // Member -> MemberResponseDto
//        given(memberMapper.memberToMemberResponseDto(any(Member.class))).willReturn(memberResponseDto);
//
//        // When
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/member")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        // THen
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.name").value(memberPostDto.getName()))
//                .andExpect(jsonPath("$.data.email").value(memberPostDto.getEmail()))
//                .andExpect(jsonPath("$.data.password").value(memberPostDto.getPassword()))
//                .andExpect(jsonPath("$.data.imgUrl").value(memberPostDto.getImgUrl()))
//                // RestDocs 문서화
//                .andDo(document("Member_Post",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                        fieldWithPath("imgUrl").type(JsonFieldType.STRING).description("회원 이미지").optional()
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("회원 이름"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("data.password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                        fieldWithPath("data.tot_Money").type(JsonFieldType.NUMBER).description("회원 세뱃돈"),
//                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
//                                        fieldWithPath("data.imgUrl").type(JsonFieldType.STRING).description("회원 이미지"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("회원 정보 생성일"),
//                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("회원 정보 수정일")
//                                )
//                        )
//                ));
//    }
//
//    @Test
//    public void Member_Get_Test() throws Exception {
//        // Given
//        long memberId = 1L;
//        Member member = Member.builder()
//                    .memberId(memberId)
//                    .name("hgd1")
//                    .email("hgd1@gmail.com")
//                    .password("qwer1234")
//                    .imgUrl("imgUrl")
//                    .tot_Money(10000)
//                    .memberStatus(MEMBER_ACTIVE)
//                    .build();
//
//        MemberResponseDto responseDto = MemberResponseDto.builder()
//                .memberId(1L)
//                .name("hgd")
//                .email("hgd@gmail.com")
//                .password("qwer1234")
//                .imgUrl("imgUrl")
//                .memberStatus(MEMBER_ACTIVE)
//                .createdAt(LocalDateTime.of(2022, 11, 1, 0,0, 0, 0))
//                .modifiedAt(LocalDateTime.of(2022, 11, 1, 0,0, 0, 0))
//                .build();
//
//        // MemberService Test
//        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
//
//        // Member to Response Test
//        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(responseDto);
//
//        // When
//        ResultActions actions =
//                mockMvc.perform(
//                        get("/member/{member-id}", memberId)
//                );
//        // Then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.memberId").value(responseDto.getMemberId()))
//                .andDo(document("Member_Get",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        pathParameters(
//                                parameterWithName("member-id").description("회원 식별자")
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("회원 이름"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("data.password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                        fieldWithPath("data.imgUrl").type(JsonFieldType.STRING).description("회원 사진 경로"),
//                                        fieldWithPath("data.tot_Money").type(JsonFieldType.NUMBER).description("회원 세뱃돈"),
//                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("회원 가입 일시"),
//                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("회원 수정 일시")
//                                        )
//                        )
//                ));
//
//    }
//
//    @Test
//    public void Member_Gets_Test() throws Exception {
//        //given
//        int page = 1;
//        int size = 10;
//
//        Member member1 = Member.builder()
//                .memberId(1L).name("hgd1").email("hgd1@gmail.com").password("qwer1234")
//                .imgUrl("imgUrl").tot_Money(10000).memberStatus(MEMBER_ACTIVE)
//                .build();
//
//        Member member2 = Member.builder()
//                .memberId(2L).name("hgd2").email("hgd2@gmail.com").password("qwer1234")
//                .imgUrl("imgUrl").tot_Money(10000).memberStatus(MEMBER_ACTIVE)
//                .build();
//
//        List<Member> members = new ArrayList<>();
//        members.add(member1);
//        members.add(member2);
//
//        Page<Member> memberPage = new PageImpl<>(members);
//
//        MemberResponseDto memberResponseDto1 = MemberResponseDto.builder()
//                .memberId(1L).name("hgd1").email("hgd1@gmail.com").password("qwer1234")
//                .imgUrl("imgURL").tot_Money(0).memberStatus(MEMBER_ACTIVE)
//                .createdAt(LocalDateTime.now()).modifiedAt(LocalDateTime.now())
//                .build();
//
//        MemberResponseDto memberResponseDto2 = MemberResponseDto.builder()
//                .memberId(2L).name("hgd2").email("hgd2@gmail.com").password("qwer1234")
//                .imgUrl("imgURL").tot_Money(0).memberStatus(MEMBER_ACTIVE)
//                .createdAt(LocalDateTime.now()).modifiedAt(LocalDateTime.now())
//                .build();
//
//        List<MemberResponseDto> responses = List.of(memberResponseDto1, memberResponseDto2);
//
//        given(memberService.findMembers(Mockito.anyInt(),Mockito.anyInt())).willReturn(memberPage);
//        given(memberMapper.membersToMemberResponseDtos(Mockito.anyList())).willReturn(responses);
//
//        //when
//        ResultActions actions= mockMvc.perform(
//                                    get("/member?page={page}&size={size}",1,10, page, size)
//                                            .accept(MediaType.APPLICATION_JSON)
//                                            .contentType(MediaType.APPLICATION_JSON)
////                .param("page", String.valueOf(page)).param("size", String.valueOf(size))
//        );
//
//        //then
//        actions
//                .andExpect(status().isOk())
////                .andExpect(jsonPath("$.data").isArray())
////                .andExpect(jsonPath("$.pageInfo.page").value(page))
////                .andExpect(jsonPath("$.pageInfo.size").value(size))
//                .andDo(
//                        document("Member_Gets",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(
//                                        parameterWithName("page").description("페이지"),
//                                        parameterWithName("size").description("페이지의 크기")
//                                ),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("회원 이름"),
//                                                fieldWithPath("data[].email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                                fieldWithPath("data[].password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                                fieldWithPath("data[].imgUrl").type(JsonFieldType.STRING).description("회원 사진 경로"),
//                                                fieldWithPath("data[].tot_Money").type(JsonFieldType.NUMBER).description("회원 세뱃돈"),
//                                                fieldWithPath("data[].memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE / MEMBER_SLEEP / MEMBER_QUIT"),
//                                                fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("회원 가입 일시"),
//                                                fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("회원 수정 일시"),
//
//                                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
//                                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지"),
//                                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
//                                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 회원수"),
//                                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지수")
//                                        )
//                                )
//                        )
//                );
//    }
//
//    @Test
//    public void Member_Patch_Test() throws Exception {
//        // given
//        long memberId = 1L;
//        MemberPatchDto patch = MemberPatchDto.builder()
//                .memberId(memberId).name("hgd").email("hgd@gmail.com").password("qwer1234")
//                .imgUrl("imgUrl").tot_Money(10000)
//                .build();
//
//        String content = gson.toJson(patch);
//        System.out.println(content);
//
//        MemberResponseDto response = MemberResponseDto.builder()
//                .memberId(memberId).name("hgd").email("hgd@gmail.com").password("qwer1234")
//                .imgUrl("imgUrl").tot_Money(10000)
//                .memberStatus(MEMBER_ACTIVE).createdAt(LocalDateTime.now()).modifiedAt(LocalDateTime.now())
//                .build();
//
//        given(memberMapper.memberPatchToMember(any(MemberPatchDto.class))).willReturn(new Member());
//
//        given(memberService.updateMember(any(Member.class))).willReturn(new Member());
//
//        given(memberMapper.memberToMemberResponseDto(any(Member.class))).willReturn(response);
//
//        // When
//        ResultActions actions =
//                mockMvc.perform(
//                        patch("/member/{member-id}", memberId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        // Then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.memberId").value(patch.getMemberId()))
//                .andExpect(jsonPath("$.data.name").value(patch.getName()))
//                .andExpect(jsonPath("$.data.email").value(patch.getEmail()))
//                .andExpect(jsonPath("$.data.password").value(patch.getPassword()))
//                .andExpect(jsonPath("$.data.imgUrl").value(patch.getImgUrl()))
//                .andExpect(jsonPath("$.data.tot_Money").value(patch.getTot_Money()))
////                .andExpect(jsonPath("$.data.memberStatus").value(patch.getMemberStatus().getStatus()))
////                .andExpect(jsonPath("$.data.modifiedAt").value(patch.getModifiedAt()))
//                .andDo(document("Member_Patch",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("member-id").description("회원 식별자")
//                                ),
//                                requestFields(
//                                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                                fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
//                                                fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                                fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                                fieldWithPath("imgUrl").type(JsonFieldType.STRING).description("회원 사진 경로"),
//                                                fieldWithPath("tot_Money").type(JsonFieldType.NUMBER).description("회원 세뱃돈")
//                                ),
//                                responseFields(
//                                        List.of(
//                                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                                fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                                fieldWithPath("data.name").type(JsonFieldType.STRING).description("회원 이름"),
//                                                fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                                fieldWithPath("data.password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                                fieldWithPath("data.imgUrl").type(JsonFieldType.STRING).description("회원 사진 경로"),
//                                                fieldWithPath("data.tot_Money").type(JsonFieldType.NUMBER).description("회원 세뱃돈"),
//                                                fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 계정 상태: 활동중 / 휴면 상태 / 탈퇴 상태"),
//                                                fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("회원 최초 생성일"),
//                                                fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("회원 최종 수정일")
//                                        )
//                                )
//                        )
//                );
//    }
//
//    @Test
//    public void Member_Delete_Test() throws Exception {
//        // Given
//        long memberId = 1L;
//
//        // When
//        ResultActions actions =
//                mockMvc.perform(
//                        delete("/member/{member-id}", memberId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                );
//        // Then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(document("Member_Delete",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("member-id").description("회원 식별자")
//                                )
//                        )
//                );
//    }
//}