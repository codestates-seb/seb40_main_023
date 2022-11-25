package seb40.main023.server.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import seb40.main023.server.member.repository.MemberRepository;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.security.utils.CustomAuthorityUtils;

@Configuration
public class JavaConfig {
    @Bean
    public MemberService MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
                                       CustomAuthorityUtils authorityUtils) {
        return new MemberService(memberRepository, passwordEncoder, authorityUtils);
    }
}
