package seb40.main023.server.awsS3.entity;

import lombok.*;
import seb40.main023.server.luckMango.entity.LuckMango;
import seb40.main023.server.member.entity.Member;

import javax.persistence.*;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class S3UpFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long upFileId;

    private String upFileName;
    private String upFileUrl;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    public void setMember(Member member) {
//        this.member = member;
//    }
}
