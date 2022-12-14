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
//        //given ??????
//        long luckBagId = 1L;
//        LuckBagPatchDto patch = new LuckBagPatchDto(
//                luckBagId,
//                "?????????",
//                "?????????",
//                1);
////        LuckBagPatchDto patch = new LuckBagPatchDto();
////        patch.setLuckBagId(luckBagId);
////        patch.setBody("?????????");
////        patch.setWriter("?????????");
////        patch.setBagStyle(1);
////
//        String content = gson.toJson(patch);
//
//
//        LuckBagResponseDto responseDto = new LuckBagResponseDto(
//                luckBagId,
//                1L,
//                "?????????",
//                "?????????",
//                1,
//                1,
//                false);
////        LuckBagResponseDto response = new LuckBagResponseDto();
////        response.setLuckBagId(luckBagId);
////        response.setLuckMangoId(1L);
////        response.setBody("?????????");
////        response.setWriter("?????????");
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
//        //when ??????
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
//        //then ?????????
//        //response ????????? ?????? , ???????????? .andExpect() ???????????? ???????????? ????????? ??????
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
//                                parameterWithName("luckBagId").description("???????????? ?????????")
//                        ),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("luckBagId").type(JsonFieldType.NUMBER).description("?????? ?????????").ignored(),
//                                        fieldWithPath("body").type(JsonFieldType.STRING).description("????????? ??????").optional(),
//                                        fieldWithPath("writer").type(JsonFieldType.STRING).description("????????? ??????").optional(),
//                                        fieldWithPath("bagStyle").type(JsonFieldType.NUMBER).description("???????????? ??????").optional()
//                                )
//                        ),
//
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.luckBagId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
//                                        fieldWithPath("data.luckMangoId").type(JsonFieldType.NUMBER).description("????????? ?????????"),
//                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("???????????? ??????"),
//                                        fieldWithPath("data.writer").type(JsonFieldType.STRING).description("????????? ??????"),
//                                        fieldWithPath("data.bagStyle").type(JsonFieldType.NUMBER).description("???????????? ????????? ??????"),
//                                        fieldWithPath("data.bagColor").type(JsonFieldType.NUMBER).description("???????????? ?????? ??????"),
//                                        fieldWithPath("data.viewed").type(JsonFieldType.BOOLEAN).description("???????????? ???????????? new")
//
//                                )
//                        )));
//
//
//    }
//
//}
