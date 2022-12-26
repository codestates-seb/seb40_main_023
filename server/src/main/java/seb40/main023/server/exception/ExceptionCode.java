package seb40.main023.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NAME_NOT_MATCH(403, "유저 네임이 다릅니다"),
    LUCKMANGO_NOT_FOUND(404, "LuckMango not found"),
    LUCKMANGO_BAD_REQUEST(400, "잘못된 요청"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    LUCKBAG_NOT_FOUND(404,"LuckBag not found" ),

    PASSWORD_NOT_MATCH(400, "Password not match" ),

    S3_FILE_NOT_FOUND(404, "S3에 저장된 이미지가 없습니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
