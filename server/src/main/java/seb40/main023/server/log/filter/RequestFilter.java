package seb40.main023.server.log.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class RequestFilter implements Filter {

    @Override
    // 필터 인스턴스를 !초기화! 하고 서비스에 추가하기 위한 메소드,
    //init 메소드로 필터 인스턴스를 초기화 하면 이후 요청들은 dofilter 를 통해 처리
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    // 사실상 기능 구현부 , 우리가 필요한 처리 과정을 넣어주는 메소드
    //filter chain 파라미터를 통해 요청을 전달
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        //전처리 과정 ( request ) - HttpServletRequest와 HttpServletResponse를 캐시 가능하도록 래핑해준다.
        ContentCachingRequestWrapper httpServletRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper httpServletResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);


        //전, 후 처리의 기준이되는 메소드 (chain.dofilter 기준으로 전에 적은 코드는 request // 후에 적은 코드는 response 이다)
        //추가로 aop 에서 바디를 내보내지 않으면 response 값이 나가지 않는다 (주의)
        //filter의 동작에 httpServletRequest, httpServletResponse를 이용한다.
        chain.doFilter(httpServletRequest, httpServletResponse);


        //후 처리 과정 ( response )

        //request 요청으로 어떤 uri가 들어왔는지 확인
        String uri = httpServletRequest.getRequestURI();

        //request 내용 확인
        String reqContent = new String(httpServletRequest.getContentAsByteArray());
        log.info("uri : {}, request : {}", uri, reqContent);


        // response 내용 상태 정보, 내용 확인
        int httpStatus = httpServletResponse.getStatus();
        String resContent = new String(httpServletResponse.getContentAsByteArray());

        //주의 : response를 클라이언트에서 볼 수 있도록 하려면 response를 복사해야 한다. response를 콘솔에 보여주면 내용이 사라진다.
        httpServletResponse.copyBodyToResponse();

        log.info("status: {}, response {}", httpStatus, resContent);
    }



    @Override // 필터 인스턴스를 서비스에서 제거 웹 컨테이너에서 1번만 호출
    public void destroy() {
        Filter.super.destroy();
    }
}
