package seb40.main023.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberPatchDto {
    private long memberId;
    private String name;
    private String email;
    private String password;
    private LocalDateTime modifiedAt;
}
