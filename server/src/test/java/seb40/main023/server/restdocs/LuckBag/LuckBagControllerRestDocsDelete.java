//package seb40.main023.server.restdocs.LuckBag;
//
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.ResultActions;
//import seb40.main023.server.luckBag.controller.LuckBagController;
//import seb40.main023.server.luckBag.mapper.LuckBagMapper;
//import seb40.main023.server.luckBag.service.LuckBagService;
//
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(LuckBagController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class LuckBagControllerRestDocsDelete {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private LuckBagService luckBagService;
//    @MockBean
//    private LuckBagMapper mapper;
//    @Test
//    public void deleteLuckBagTest() throws Exception{
//        //given
//        long luckBagId = 1L;
//
//        //when
//        ResultActions action =
//                mockMvc.perform(
//                        delete("/v1/luckBag/{luckBagId}" , luckBagId)
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                );
//
//
//        //then
//        MvcResult result =
//                action
//                        .andExpect(status().isNoContent())
//                        .andDo(document("delete-luckBag"))
//                        .andReturn();
//
//    }
//}
