package seb40.main023.server.helper.event;

import lombok.Getter;
import seb40.main023.server.member.entity.Member;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}
