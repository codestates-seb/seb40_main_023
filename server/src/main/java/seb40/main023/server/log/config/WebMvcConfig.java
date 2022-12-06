package seb40.main023.server.log.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import seb40.main023.server.log.filter.RequestFilter;


//환경 구성
@Configuration // 이게 빈에 등록해주는 어노테이션임
public class WebMvcConfig implements WebMvcConfigurer {
        //인터셉터를 사용하고 싶다면 아래 주석 처리한 코드 들을 풀어주자
        //인터셉터로는 뭘 구현할지는 시간이 없어서 정하지 못했다.. 나중에 프로젝트 끝나고 기간 생각해서 추가해보자
    // 인터셉터 클래스들 DI
//    @Autowired
//    RequestInterceptor requestInterceptor;
//
//    @Autowired
//    ResponseInterceptor responseInterceptor;

    //인터셉터 레지스트리 등록
//    @Override  // 오버라이드가 붙어 있으면 핵심 기능을 재정의 해야하는 애들이기 때문에 override 위주로 검색해서 찾아보자 ! 잘 모르겠으면
//    public void addInterceptors(InterceptorRegistry registry) {
        // 컴포넌트를 사용할려면 3가지 방법이 있다. 1. autowired 를 사용해 di 방법 / 2. qualifier를 이용해서 빈으로 등록
        // 지금 적힌 코드는 1번 방법을 사용해서 di 했당. component 로 등록된 빈들을 Autowired 불러와 DI로 사용
        // request 랑 response interceptor 인터셉터들을 레지스트리에 집어넣어서 줬음 . 레지스트리가 뭔지는 모름
//        registry.addInterceptor(requestInterceptor).addPathPatterns("/**");
//        registry.addInterceptor(responseInterceptor).addPathPatterns("/**");
//    }



    // 이 코드는 @Component + @Orders 어노테이션을 풀어서 작성한거시다
    @Bean
    public FilterRegistrationBean registrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new RequestFilter());
        filterRegistrationBean.setOrder(1);

        // @WebFilter(urlPatterns= "/user/*") 이 어노테이션은 @Component 랑 + Orders 랑 같이 사용한면 안먹힘. 코드로 하나씩 다 작성해준것.
        // 어떤 url 경로가 filter 를 거칠지 작성
        filterRegistrationBean.addUrlPatterns("/luckBag");
        filterRegistrationBean.addUrlPatterns("/luckBag/*");
        filterRegistrationBean.addUrlPatterns("/luckMango");
        filterRegistrationBean.addUrlPatterns("/member/*");
        filterRegistrationBean.addUrlPatterns("/luckMango/*");
        return filterRegistrationBean;
    }
}
