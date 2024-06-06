package nashtech.khanhdu.backend.exceptions;

public class CategoryExistedException extends RuntimeException{

    public  CategoryExistedException(String mess) {
        super(mess);
    }

    public CategoryExistedException() {}
}
