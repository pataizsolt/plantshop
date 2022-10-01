package hu.plantshop.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class NoRefreshTokenException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NoRefreshTokenException() {
        super("No refreshtoken found");
    }
}