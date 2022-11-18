//package seb40.main023.server.restdocs.LuckBag;
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
//import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
//import seb40.main023.server.luckBag.entity.LuckBag;
//import seb40.main023.server.luckBag.mapper.LuckBagMapper;
//import seb40.main023.server.luckBag.service.LuckBagService;
//
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(LuckBagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class LuckBagControllerRestDocsGet {
//
//    @Autowired
//    private MockMvc mockmvc;
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
//    @Test
//    public void getLuckBagTest() throws Exception {
//
//        //given 준비
//        long luckBagId = 1L;
//        LuckBagResponseDto responseDto = new LuckBagResponseDto(
//                luckBagId,
//                1,
//                "작성글",
//                "작성자",
//                1,
//                1,
//                false
//
//        );
//
//
//
//
//        given(luckBagService.findLuckBag(luckBagId)).willReturn(new LuckBag());
//        given(mapper.luckBagToLuckBagResponseDto(Mockito.any(LuckBag.class))).willReturn(responseDto);
//
//        //when 실행
//        ResultActions actions =
//                mockmvc.perform(
//                        get("/v1/luckBag/{luckBagId}", luckBagId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//
//                );
//
//
//        //then 문서화
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("get-luckBag",
//                        getResponsePreProcessor(),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.luckBagId").type(JsonFieldType.NUMBER).description("복주머니 식별자"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("복망고 식별자"),
//                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("복주머니 내용"),
//                                        fieldWithPath("data.writer").type(JsonFieldType.STRING).description("작성자 이름"),
//                                        fieldWithPath("data.bagStyle").type(JsonFieldType.NUMBER).description("복주머니 생김새 종류"),
//                                        fieldWithPath("data.bagColor").type(JsonFieldType.NUMBER).description("복주머니 색상 종류"),
//                                        fieldWithPath("data.viewed").type(JsonFieldType.BOOLEAN).description("복주머니 안읽은글 new")
//                                )
//                        )
//                ));
//    }
//}
