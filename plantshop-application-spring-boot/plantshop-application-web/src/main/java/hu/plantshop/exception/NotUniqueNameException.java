package hu.plantshop.exception;

public class NotUniqueNameException extends Exception {
    private static final long serialVersionUID = 1L;

    public NotUniqueNameException(String message) {
        super(message);
    }
}
