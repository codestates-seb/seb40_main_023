package seb40.main023.server.luckBag.exception;


import lombok.Getter;

public class BusinessLogicException extends RuntimeException{

    @Getter
    private  ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

}
