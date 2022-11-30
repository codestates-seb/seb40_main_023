package seb40.main023.server.security.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import seb40.main023.server.security.auth.filter.JwtAuthenticationFilter;
import seb40.main023.server.security.auth.filter.JwtVerificationFilter;
import seb40.main023.server.security.auth.handler.MemberAccessDeniedHandler;
import seb40.main023.server.security.auth.handler.MemberAuthenticationEntryPoint;
import seb40.main023.server.security.auth.handler.MemberAuthenticationFailureHandler;
import seb40.main023.server.security.auth.handler.MemberAuthenticationSuccessHandler;
import seb40.main023.server.security.auth.jwt.JwtTokenProvider;
import seb40.main023.server.security.utils.CustomAuthorityUtils;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일 출처로부터 들어오는 request만 페이지 렌더링을 허용
                .and()

                .csrf().disable()        // CSRF(Cross-Site Request Forgery) 공격에 대한 Spring Security에 대한 설정을 비활성화

                .cors(withDefaults())    // corsConfigurationSource라는 이름으로 등록된 Bean을 이용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션을 생성하지 않도록 설정
                .and()

                .formLogin().disable()   // SSR 방식에서 사용하는 폼 로그인 방식을 비활성화(우리는 CSR)

                .httpBasic().disable()   //

                .exceptionHandling()
                    .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                    .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()

                .apply(new CustomFilterConfigurer())   // filter 추가
                .and()

                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/member").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/member/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/member/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/member").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/member/**").hasAnyRole("USER","ADMIN")

                        .antMatchers(HttpMethod.POST, "/luckMango").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/luckMango/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/luckMango").hasAnyRole("USER", "ADMIN") // 전체 조회
                        .antMatchers(HttpMethod.GET, "/luckMango/public/**").permitAll()    // Public 전체 보기
                        .antMatchers(HttpMethod.GET, "/luckMango/member/**").hasAnyRole("USER", "ADMIN")    // memberId 조회
                        .antMatchers(HttpMethod.GET, "/luckMango/**").permitAll()           // 단일 복망고 조회 <- 아마도 이 URL을 공유해야 하지 않을까...?
                        .antMatchers(HttpMethod.DELETE, "/luckMango/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/luckBag").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/luckBag/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/luckBag/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/luckBag/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/review").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/review/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/review/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/review").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/review/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));   // (8-1)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));  // 지정한 HTTP Method에 대한 HTTP 통신을 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();   // (8-3)
        source.registerCorsConfiguration("/**", configuration);      // (8-4)
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // JwtAuthenticationFilter를 등록하는 역할
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // configure() 메서드를 오버라이드
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // AuthenticationManager의 객체 획득

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider);  // JwtAuthenticationFilter를 생성 / AuthenticationManager, JwtTokenProvider DI
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            // Authentication Handler
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenProvider, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)  // JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
                .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);   // JwtVerificationFilter
        }
    }
}