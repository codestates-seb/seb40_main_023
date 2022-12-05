package seb40.main023.server.awsS3.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class S3UpFileResponse {
    private Long upFileId;

    private String upFilename;
    private String upFileUrl;

}
