//package seb40.main023.server.restdocs.LuckBag;
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
//import seb40.main023.server.luckBag.controller.LuckBagController;
//import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
//import seb40.main023.server.luckBag.entity.LuckBag;
//import seb40.main023.server.luckBag.mapper.LuckBagMapper;
//import seb40.main023.server.luckBag.service.LuckBagService;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.util.ApiDocumentUtils.getRequestPreProcessor;
//import static seb40.main023.server.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(LuckBagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//
//public class LuckBagControllerRestDocsGetAll {
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
//    public void getAllLuckBagTest() throws Exception {
//        //given 준비
//        long luckMangoId = 1L;
//        int page = 1;
//        int size = 10;
//
//        LuckBag luckBag1 = new LuckBag();
//        luckBag1.setLuckBagId(1L);
//
//        LuckBag luckBag2 = new LuckBag();
//        luckBag2.setLuckBagId(2L);
//
//        List<LuckBag> luckBagList = new ArrayList<>();
//        luckBagList.add(luckBag1);
//        luckBagList.add(luckBag2);
//
//        Page<LuckBag> luckBagPage = new PageImpl<>(luckBagList);
//
//        LuckBagResponseDto responseDto1 = new LuckBagResponseDto(
//                1L,
//                1,
//                "작성글",
//                "작성자",
//                1,
//                1,
//                false
//
//        );
//
//        LuckBagResponseDto responseDto2 = new LuckBagResponseDto(
//                2L,
//                2,
//                "작성글2",
//                "작성자2",
//                2,
//                2,
//                false
//
//        );
//
//        List<LuckBagResponseDto> luckBagResponseDtoList = List.of(responseDto1,responseDto2);
//
//        given(luckBagService.findLuckBagList(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt())).willReturn(luckBagPage);
//        given(mapper.luckBagToLuckBagResponseDtos(Mockito.any(List.class))).willReturn(luckBagResponseDtoList);
//
//
//        //when 실행
//        ResultActions action =
//                mockmvc.perform(
//                        get("/v1/luckBag?luckMangoId={luckMangoId}&page={page}&size={size}",
//                                1L,1,10, luckMangoId,page,size )
//
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                );
//
//
//        //then 문서화
//        action
//                .andExpect(status().isOk())
//                .andDo(document("getAll-luckBag",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//
//                        requestParameters(
//                                parameterWithName("luckMangoId").description("복망고 식별자"),
//
//                                parameterWithName("page").description("현재 페이지"),
//                                parameterWithName("size").description("복망고 바구니 갯수")
//
//                        ),
//                        // 문서로 표현될 requestBody를 의미 , 파라미터로 전달되는 List 의 원소인 fieldDescriptor 인서턴스가 requestBody에 포함된 데이터를 표현
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
//                                        fieldWithPath("data[].luckMangoId").type(JsonFieldType.NUMBER).description("복망고 식별자"),
//                                        fieldWithPath("data[].luckBagId").type(JsonFieldType.NUMBER).description("복주머니 식별자"),
//
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("보여지는 복망고 바구니 갯수"),
//                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 복주머니 갯수"),
//                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 바구니 갯수"),
//
//                                        fieldWithPath("data[].body").type(JsonFieldType.STRING).description("복주머니 내용"),
//                                        fieldWithPath("data[].writer").type(JsonFieldType.STRING).description("작성자 이름"),
//                                        fieldWithPath("data[].bagStyle").type(JsonFieldType.NUMBER).description("복주머니 생김새 종류"),
//                                        fieldWithPath("data[].bagColor").type(JsonFieldType.NUMBER).description("복주머니 색상 종류"),
//                                        fieldWithPath("data[].viewed").type(JsonFieldType.BOOLEAN).description("복주머니 안읽은글 new")
//                                )
//                        )
//                ));
//    }
//}
