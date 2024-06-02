package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.dto.ErrorResponse;
import nashtech.khanhdu.backend.dto.SignUpDto;
import nashtech.khanhdu.backend.dto.UserDto;
import nashtech.khanhdu.backend.entities.User;
import nashtech.khanhdu.backend.exceptions.UserExistException;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler({UserNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleUserNotFoundException(
            UserNotFoundException exception
    ) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("User not found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler({UserExistException.class})
    protected ResponseEntity<ErrorResponse> handlerUserExistsException (
            UserNotFoundException exception
    ) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_ACCEPTABLE.value())
                .message("Username or email already existed").build();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(error);
    }

    @PostMapping(
            path = "/auth/signup",
            consumes = { MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<SignUpDto> signUp (@RequestBody @Valid SignUpDto data) {
        userService.signUp(data);
        return ResponseEntity.ok(data);
    }

    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser (@PathVariable("userId") Long userId, @RequestBody UserDto dto) {
        return userService.updateUser(userId, dto);
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long userId) {
        return userService.deleteUser(userId);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public User getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }
}
