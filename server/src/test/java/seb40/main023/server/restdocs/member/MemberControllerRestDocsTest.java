//package seb40.main023.server.restdocs.member;
//
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import seb40.main023.server.exception.BusinessLogicException;
//import seb40.main023.server.member.controller.MemberController;
//import seb40.main023.server.member.dto.MemberPostDto;
//import seb40.main023.server.member.dto.MemberResponseDto;
//import seb40.main023.server.member.entity.Member;
//import seb40.main023.server.member.entity.MemberStatus;
//import seb40.main023.server.member.mapper.MemberMapper;
//import seb40.main023.server.member.service.MemberService;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
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
//    void Member_PostTest() throws Exception {
//
//        // Given
//        MemberPostDto memberPostDto = MemberPostDto.builder()
//                .name("hgd")
//                .email("hgd@gmail.com")
//                .password("qwer1234")
//                .build();
//
//        String content = gson.toJson(memberPostDto);
//
//        System.out.println("memberPostDto : " + content);
//
//        MemberResponseDto memberResponseDto =
//                new MemberResponseDto(
//                1L,
//                "hgd",
//                "hgd@gmail.com",
//                "qwer1234",
//                "",
//                0, MemberStatus.MEMBER_ACTIVE, LocalDateTime.now(), LocalDateTime.now());
//        String resContent = gson.toJson(memberResponseDto);
//        System.out.println("memberResponseDto : " + resContent );
//
//        // MemberPostDto -> Member
//        given(memberMapper.memberPostToMember(Mockito.any(MemberPostDto.class))).willReturn(new Member());
//
//        // MemberService
//        given(memberService.createMember(Mockito.any(Member.class))).willReturn(new Member());
//
//        // Member -> MemberResponseDto
//        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(new MemberResponseDto());
//
//        // When
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/members")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//        // THen
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.name").value(memberPostDto.getName()))
//                .andExpect(jsonPath("$.data.email").value(memberPostDto.getEmail()))
//                .andExpect(jsonPath("$.data.password").value(memberPostDto.getPassword()))
////                .andExpect(jsonPath("$[0].name").value(memberPostDto.getName()))
////                .andExpect(jsonPath("$[0].email").value(memberPostDto.getEmail()))
////                .andExpect(jsonPath("$[0].password").value(memberPostDto.getPassword()))
////                .andExpect(jsonPath("$.name").value(memberPostDto.getName()))
////                .andExpect(jsonPath("$.email").value(memberPostDto.getEmail()))
////                .andExpect(jsonPath("$.password").value(memberPostDto.getPassword()))
//
//                // RestDocs 문서화
//                .andDo(document("Member_Post",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
//                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("회원 이름"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("data.password").type(JsonFieldType.STRING).description("회원 비밀번호"),
//                                        fieldWithPath("data.nyMoney").type(JsonFieldType.STRING).description("세뱃돈"),
//                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태")
//                                )
//                        )
//                ));
//    }
//}
