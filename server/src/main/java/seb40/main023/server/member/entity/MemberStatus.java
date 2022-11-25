package seb40.main023.server.member.entity;

import lombok.Getter;

public enum MemberStatus {
    MEMBER_ACTIVE("활동중"),
    MEMBER_SLEEP("휴면 상태"),
    MEMBER_QUIT("탈퇴 상태");

    @Getter
    private final String status;

    MemberStatus(String status) { this.status = status; }
}