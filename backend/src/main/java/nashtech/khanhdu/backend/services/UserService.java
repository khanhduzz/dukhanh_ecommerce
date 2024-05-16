package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {

    List<User> getAllUsers();

    UserDto getUser (Long id);

    UserDto createUser (CreateUserDto dto);

    UserDto updateUser (Long id, UpdateUserDto dto);

    User deleteUser (Long id);

    UserDto addFavoriteProduct (Long id, Long productId);

    Set<Product> getAllFavoriteProducts(Long id);

}
