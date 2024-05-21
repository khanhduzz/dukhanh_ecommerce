package nashtech.khanhdu.backend.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String mess) {
        super(mess);
    }
    public UserNotFoundException() {

    }
}
