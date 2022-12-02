package seb40.main023.server.Upload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpFileResponse {
    private Long upFileId;

    private String upFilename;
    private String upFileOriName;
    private String upFileUrl;
    private String imgUrl;

}
