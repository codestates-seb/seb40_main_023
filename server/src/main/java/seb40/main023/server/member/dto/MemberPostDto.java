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

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,}$",
            message = "최소 8자, 최소 각 하나의 문자, 숫자 및 특수문자(@$!%*#?&)가 필요합니다.")
    private String password;

    private String imgUrl;

    public MemberPostDto(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.imgUrl="NONE";
    }
}
