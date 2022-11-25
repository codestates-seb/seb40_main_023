package seb40.main023.server.security.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.security.utils.CustomAuthorityUtils;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberAuthenticationProvider implements AuthenticationProvider {
    private final MemberService memberService;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    //  인증 처리 로직을 이용해 사용자의 인증 여부 결정
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication;  //  authentication을 캐스팅하여 authToken

        // 해당 사용자의 Username을 얻은 후, 존재하는지 체크
        String username = authToken.getName();
        Optional.ofNullable(username).orElseThrow(() -> new UsernameNotFoundException("Invalid User name or User Password"));

        // DB에서 해당 사용자를 조회
        Member member = memberService.findMember(username);

        String password = member.getPassword();
        verifyCredentials(authToken.getCredentials(), password);    // 패스워드 일치 검증

        Collection<? extends GrantedAuthority> authorities = authorityUtils.createAuthorities(member.getRoles());  // 권한 생성

        // 인증된 사용자의 인증 정보를 리턴값으로 전달
        return new UsernamePasswordAuthenticationToken(username, password, authorities);
    }

    // AuthenticationProvider가 Username/Password 방식의 인증을 지원
    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }

    private void verifyCredentials(Object credentials, String password) {
        if (!passwordEncoder.matches((String)credentials, password)) {
            throw new BadCredentialsException("Invalid User name or User Password");
        }
    }
}