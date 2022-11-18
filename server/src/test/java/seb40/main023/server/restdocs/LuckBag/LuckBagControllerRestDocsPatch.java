//package seb40.main023.server.restdocs.LuckBag;
//
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
//import seb40.main023.server.luckBag.controller.LuckBagController;
//import seb40.main023.server.luckBag.dto.LuckBagPatchDto;
//import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
//import seb40.main023.server.luckBag.entity.LuckBag;
//import seb40.main023.server.luckBag.mapper.LuckBagMapper;
//import seb40.main023.server.luckBag.service.LuckBagService;
//
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.util.ApiDocumentUtils.getRequestPreProcessor;
//import static seb40.main023.server.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(LuckBagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class LuckBagControllerRestDocsPatch {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private LuckBagService luckBagService;
//
//    @MockBean
//    private LuckBagMapper mapper;
//
//
//    @Test
//    public void patchLuckBagTest() throws Exception{
//        //given 준비
//        long luckBagId = 1L;
//        LuckBagPatchDto patch = new LuckBagPatchDto(
//                luckBagId,
//                "작성글",
//                "작성자",
//                1);
////        LuckBagPatchDto patch = new LuckBagPatchDto();
////        patch.setLuckBagId(luckBagId);
////        patch.setBody("작성글");
////        patch.setWriter("작성자");
////        patch.setBagStyle(1);
////
//        String content = gson.toJson(patch);
//
//
//        LuckBagResponseDto responseDto = new LuckBagResponseDto(
//                luckBagId,
//                1L,
//                "작성글",
//                "작성자",
//                1,
//                1,
//                false);
////        LuckBagResponseDto response = new LuckBagResponseDto();
////        response.setLuckBagId(luckBagId);
////        response.setLuckMangoId(1L);
////        response.setBody("작성글");
////        response.setWriter("작성자");
////        response.setBagStyle(1);
////        response.setBagColor(1);
////        response.setViewed(false);
//
////        given(mapper.luckBagPatchToLuckBag(Mockito.any(LuckBagPatchDto.class))).willReturn(Mockito.mock(LuckBag.class));
////        given(luckBagService.patchLuckBag(Mockito.any(LuckBag.class))).willReturn(Mockito.mock(LuckBag.class));
////        given(mapper.luckBagToLuckBagResponseDto(Mockito.any(LuckBag.class))).willReturn(response);
//
//        given(mapper.luckBagPatchToLuckBag(Mockito.any(LuckBagPatchDto.class))).willReturn(Mockito.mock(LuckBag.class));
//        given(luckBagService.patchLuckBag(Mockito.any(LuckBag.class))).willReturn(Mockito.mock(LuckBag.class));
//        given(mapper.luckBagToLuckBagResponseDto(Mockito.any(LuckBag.class))).willReturn(responseDto);
//
//        //when 실행
//
//        ResultActions action =
//                mockMvc.perform(
//                        patch("/luckBag/{luckBagId}", luckBagId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//
//                );
//
//        //then 문서화
//        //response 기대값 검증 , 결과값을 .andExpect() 메소드로 검증하는 코드를 작성
//        action
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.luckBagId").value(patch.getLuckBagId()))
//                .andExpect(jsonPath("$.data.body").value(patch.getBody()))
//                .andExpect(jsonPath("$.data.writer").value(patch.getWriter()))
//                .andExpect(jsonPath("$.data.bagStyle").value(patch.getBagStyle()))
//                .andDo(document("patch-luckBag",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        pathParameters(
//                                parameterWithName("luckBagId").description("복주머니 식별자")
//                        ),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("luckBagId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
//                                        fieldWithPath("body").type(JsonFieldType.STRING).description("작성글 내용").optional(),
//                                        fieldWithPath("writer").type(JsonFieldType.STRING).description("작성자 이름").optional(),
//                                        fieldWithPath("bagStyle").type(JsonFieldType.NUMBER).description("복주머니 모양").optional()
//                                )
//                        ),
//
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.luckBagId").type(JsonFieldType.NUMBER).description("복주머니 식별자"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 식별자"),
//                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("복주머니 내용"),
//                                        fieldWithPath("data.writer").type(JsonFieldType.STRING).description("작성자 이름"),
//                                        fieldWithPath("data.bagStyle").type(JsonFieldType.NUMBER).description("복주머니 생김새 종류"),
//                                        fieldWithPath("data.bagColor").type(JsonFieldType.NUMBER).description("복주머니 색상 종류"),
//                                        fieldWithPath("data.viewed").type(JsonFieldType.BOOLEAN).description("복주머니 안읽은글 new")
//
//                                )
//                        )));
//
//
//    }
//
//}
