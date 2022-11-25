package seb40.main023.server.security.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class LoginDto {
    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "최소 8 자, 최소 하나의 문자 및 하나의 숫자여야 합니다.")
    private String password;
}
