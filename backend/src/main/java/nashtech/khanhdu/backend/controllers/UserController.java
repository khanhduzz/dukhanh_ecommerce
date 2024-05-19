package nashtech.khanhdu.backend.controllers;

import jakarta.validation.Valid;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.ErrorResponse;
import nashtech.khanhdu.backend.dto.response.UserDto;
import nashtech.khanhdu.backend.exceptions.UserAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler({UserNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleUserNotFoundException (
            UserNotFoundException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.NOT_FOUND.value())
                .message("User Not Found").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler({UserAlreadyExistedException.class})
    protected ResponseEntity<ErrorResponse> handleUserAlreadyExistedExceptio (
            UserAlreadyExistedException exception) {
        var error = ErrorResponse.builder().code(HttpStatus.FOUND.value())
                .message("Username or Email already existed").build();
        return ResponseEntity.status(HttpStatus.FOUND).body(error);
    }

    @GetMapping("/{id}")
    public UserDto getUser (@PathVariable("id") Long id) {
        return userService.getUser(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser (@Valid @RequestBody CreateUserDto dto) {
        return userService.createUser(dto);
    }

    @PutMapping("/{id}")
    public UserDto updateUser (@PathVariable("id") Long id, @Valid @RequestBody UpdateUserDto dto) {
        return userService.updateUser(id, dto);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public User deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/{userId}/favorite")
    public Set<Product> getAllFavoriteProducts (@PathVariable("userId") Long userId) {
        return userService.getAllFavoriteProducts(userId);
    }

    @PutMapping("/{userId}/favorite/{productId}")
    public UserDto addFavoriteProduct(@PathVariable("userId") Long userId
            , @PathVariable("productId") Long productId) {
        return userService.addFavoriteProduct(userId, productId);
    }


}
