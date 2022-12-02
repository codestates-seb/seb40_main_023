package seb40.main023.server.Upload.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class UpFilePostDto{

    private Long upFileId;

    private String upFilename;
    private String upFileOriName;
    private String upFileUrl;
    private String imgUrl;
    @Positive
    private long memberId;

    public void setMemberId(long memberId){
        this.memberId = memberId;
    }

}
