package seb40.main023.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    LUCKMANGO_NOT_FOUND(404, "LuckMango not found"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    LUCKBAG_NOT_FOUND(404,"LuckBag not found" ),

    PASSWORD_NOT_MATCH(400, "Password not match" );

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
