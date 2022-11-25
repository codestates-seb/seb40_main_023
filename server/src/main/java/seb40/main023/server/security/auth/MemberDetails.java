package seb40.main023.server.security.auth;

import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import seb40.main023.server.member.entity.Member;

import java.util.List;

@Getter
public class MemberDetails extends User {
    private final Member member;
    public MemberDetails(Member member) {
        super(member.getEmail(), member.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
        this.member = member;
    }
}
