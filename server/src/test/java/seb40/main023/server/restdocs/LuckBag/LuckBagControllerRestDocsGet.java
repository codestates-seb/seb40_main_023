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
//        //given ??????
//        long luckBagId = 1L;
//        LuckBagResponseDto responseDto = new LuckBagResponseDto(
//                luckBagId,
//                1,
//                "?????????",
//                "?????????",
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
//        //when ??????
//        ResultActions actions =
//                mockmvc.perform(
//                        get("/v1/luckBag/{luckBagId}", luckBagId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//
//                );
//
//
//        //then ?????????
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("get-luckBag",
//                        getResponsePreProcessor(),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.luckBagId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
//                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("???????????? ??????"),
//                                        fieldWithPath("data.writer").type(JsonFieldType.STRING).description("????????? ??????"),
//                                        fieldWithPath("data.bagStyle").type(JsonFieldType.NUMBER).description("???????????? ????????? ??????"),
//                                        fieldWithPath("data.bagColor").type(JsonFieldType.NUMBER).description("???????????? ?????? ??????"),
//                                        fieldWithPath("data.viewed").type(JsonFieldType.BOOLEAN).description("???????????? ???????????? new")
//                                )
//                        )
//                ));
//    }
//}
