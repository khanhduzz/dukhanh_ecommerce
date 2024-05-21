package nashtech.khanhdu.backend.exceptions;

public class UserAlreadyExistedException extends RuntimeException{
    public UserAlreadyExistedException (String mess) {
        super(mess);
    }
    public UserAlreadyExistedException() {

    };
}
