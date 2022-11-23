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
//import seb40.main023.server.luckBag.controller.LuckBagController;
//import seb40.main023.server.luckBag.dto.LuckBagPostDto;
//import seb40.main023.server.luckBag.dto.LuckBagResponseDto;
//import seb40.main023.server.luckBag.entity.LuckBag;
//import seb40.main023.server.luckBag.mapper.LuckBagMapper;
//import seb40.main023.server.luckBag.service.LuckBagService;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40.main023.server.util.ApiDocumentUtils.getRequestPreProcessor;
//import static seb40.main023.server.util.ApiDocumentUtils.getResponsePreProcessor;
//
//@WebMvcTest(LuckBagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class LuckBagControllerRestDocsPost {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private LuckBagService luckBagService;
//    @MockBean
//    private LuckBagMapper mapper;
//
//    @Test
//    public void postLuckBagTest() throws Exception{
//
//        //given
//        //준비  HTTP request에 필요한 requestBody나 queryParmeter, pathVariable 등의 데이터를 추가
//        LuckBagPostDto post = new LuckBagPostDto(
//                1L,
//                1,
//                "작성글",
//                "작성자",
//                1,
//                1
//
//        );
//
//        String content = gson.toJson(post);  // post의 requestBody
//
//        LuckBagResponseDto responseDto = new LuckBagResponseDto(
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
//
//        // Member Controller 의 postMember()에 의존 하는 인스턴스의 메서드 호출을 mapper와 service에서 주입받은 Mock 인스턴스를 이용해 뽑아준다.
//        given(mapper.luckBagPostToLuckBag(Mockito.any(LuckBagPostDto.class))).willReturn(new LuckBag());
//        given(luckBagService.createdLuckBag(Mockito.any(LuckBag.class))).willReturn(new LuckBag());
//        given(mapper.luckBagToLuckBagResponseDto(Mockito.any(LuckBag.class))).willReturn(responseDto);
//
//        //when 실행
//        //request 요청 사항을 perform 메소드로 작성 // url을 통해 post 요청 전송
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/v1/luckBag")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                ); //사실 코드 내용은 잘 모름 / 람다만 들어가면 하나도모르겠듬ㅋ / 람다 공부 필요
//
//
//        //then
//        actions  // when 을 받아서 작성하고있다.
//                 //response 기대값 검증 , 결과값을 .andExpect() 메소드로 검증하는 코드를 작성
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.luckBagId").value(post.getLuckBagId()))
//                .andExpect(jsonPath("$.data.luckMangoId").value(post.getLuckMangoId()))
//                .andExpect(jsonPath("$.data.body").value(post.getBody()))
//                .andExpect(jsonPath("$.data.writer").value(post.getWriter()))
//                .andExpect(jsonPath("$.data.bagStyle").value(post.getBagStyle()))
//                .andExpect(jsonPath("$.data.bagColor").value(post.getBagColor()))
//
//                .andDo(document("post-luckBag",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        // util 디렉토리 안에 있는 ApiDocumentUtils 인터페이스를 임포트 받음 - 뭐하는앤지는 모름
//
//                        requestFields( // 문서로 표현될 requestBody를 의미 , 파라미터로 전달되는 List 의 원소인 fieldDescriptor 인서턴스가 requestBody에 포함된 데이터를 표현
//                                List.of(
//                                        fieldWithPath("luckBagId").type(JsonFieldType.NUMBER).description("복주머니 식별자"),
//                                        fieldWithPath("body").type(JsonFieldType.STRING).description("복주머니 내용"),
//                                        fieldWithPath("writer").type(JsonFieldType.STRING).description("작성자 이름"),
//                                        fieldWithPath("luckMangoId").type(JsonFieldType.NUMBER).description("복망고 식별자"),
//                                        fieldWithPath("bagStyle").type(JsonFieldType.NUMBER).description("복주머니 생김새 종류"),
//                                        fieldWithPath("bagColor").type(JsonFieldType.NUMBER).description("복주머니 색상 종류")
//
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
//                                        fieldWithPath("data.viewed").type(JsonFieldType.BOOLEAN).description("복주머니 안읽은글 new ")
//
//                                )
//                        )
//
//                ));
//
//    }
//
//}
