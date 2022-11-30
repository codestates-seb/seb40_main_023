package seb40.main023.server.security.auth2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import seb40.main023.server.member.entity.Member;
import seb40.main023.server.member.entity.MemberRole;
import seb40.main023.server.member.service.MemberService;
import seb40.main023.server.security.auth.jwt.JwtTokenProvider;

import java.security.AuthProvider;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    private final RefreshTokenService refreshTokenService;

    public void signUp(SignUpRequest request) {
        validateSignUpInfo(request);
        Member member = Member.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(MemberRole.USER)
                .provider(AuthProvider.local)
                .build();
        memberService.registerMember(member);
    }

    private void validateSignUpInfo(SignUpRequest request) {
        if (memberService.existsMemberByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }
    }

    public SignInDto.Response signIn(SignInDto.Request request) {
        Member member = memberService.findMemberByEmail(request.getEmail());
        validateMemberAuthProvider(member.getProvider());
        validatePassword(request.getPassword(), member.getPassword());
        // 토큰 만들기(access, refresh)
        JwtTokenDto jwtTokenDto = jwtTokenProvider.createJwtToken(String.valueOf(member.getId()), member.getRole());
        // refresh token 저장 (DB)
        refreshTokenService.updateRefreshToken(
                member.getId(),
                jwtTokenDto.getRefreshToken(),
                jwtTokenDto.getRefreshTokenExpireTime()
        );

        return SignInDto.Response.from(jwtTokenDto);
    }

    private void validateMemberAuthProvider(AuthProvider provider) {
        if (!provider.equals(AuthProvider.local)) {
            throw new AuthenticationException(ErrorCode.SOCIAL_SIGN_IN_MEMBER);
        }
    }

    private void validatePassword(String requestPassword, String memberPassword) {
        if (!passwordEncoder.matches(requestPassword, memberPassword)) {
            throw new AuthenticationException(ErrorCode.MISMATCH_PASSWORD);
        }
    }

    public TokenRefreshDto.Response refreshToken(TokenRefreshDto.Request request) {
        validateRefreshToken(request.getRefreshToken());

        RefreshToken refreshTokenEntity = refreshTokenService.findTokenByRefreshToken(request.getRefreshToken());
        Member member = memberService.findMemberById(refreshTokenEntity.getMemberId());

        JwtTokenDto jwtTokenDto = jwtTokenProvider.createJwtToken(String.valueOf(member.getId()), member.getRole());

        refreshTokenService.updateRefreshToken(
                member.getId(),
                jwtTokenDto.getRefreshToken(),
                jwtTokenDto.getRefreshTokenExpireTime()
        );

        return TokenRefreshDto.Response.from(jwtTokenDto);
    }

    private void validateRefreshToken(String refreshToken) {
        boolean validateToken = jwtTokenProvider.validateRefreshToken(refreshToken);
        if (!validateToken) {
            throw new AuthenticationException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
    }

    public void signOut(Long memberId) {
        refreshTokenService.removeRefreshTokenByMemberId(memberId);
    }
}