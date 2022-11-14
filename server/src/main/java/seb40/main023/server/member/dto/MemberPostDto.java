package seb40.main023.server.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPostDto {
    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    private String name;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "최소 8 자, 최소 하나의 문자 및 하나의 숫자여야 합니다.")
    private String password;
}
