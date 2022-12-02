package seb40.main023.server.Upload.entity;

import lombok.*;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UpFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long upFileId;

    private String upFilename;
    private String upFileOriName;
    private String upFileUrl;
    private String imgUrl;
    private long subMemberId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }
}
