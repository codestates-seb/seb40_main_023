package seb40.main023.server.security.utils;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seb40.main023.server.response.ErrorResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// ErrorResponse를 클라이언트에게 전송하기 위한 클래스
public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
