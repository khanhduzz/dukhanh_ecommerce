package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import nashtech.khanhdu.backend.dto.response.UserDto;
import nashtech.khanhdu.backend.exceptions.ProductNotFoundException;
import nashtech.khanhdu.backend.exceptions.UserAlreadyExistedException;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.mappers.UserMapper;
import nashtech.khanhdu.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper mapper;
    private final ProductRepository productRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper mapper,
                           ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.productRepository = productRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDto getUser(Long id) {
        return userRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(UserNotFoundException::new);
    }

    @Override
    @Transactional
    public UserDto createUser(CreateUserDto dto) {
        List<User> users = userRepository.findByUserName(dto.getUserName());
        users.forEach(user -> {
            if (user.getUserName().equals(dto.getUserName())) throw new UserAlreadyExistedException();
        });

        users = userRepository.findByEmail(dto.getEmail());
        users.forEach(user -> {
            if (user.getEmail().equals(dto.getEmail())) throw new UserAlreadyExistedException();
        });

        User user = mapper.toEntity(dto);
        user = userRepository.save(user);
        return mapper.toDto(user);
    }

    @Override
    @Transactional
    public UserDto updateUser(Long id, UpdateUserDto dto) {
        return userRepository.findById(id)
                .map(user -> {
                    var updateUser = mapper.updateEntity(user, dto);
                    updateUser = userRepository.save(updateUser);
                    return mapper.toDto(updateUser);
                }).orElseThrow(UserNotFoundException::new);
    }

    @Override
    @Transactional
    public User deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.getFavoriteProducts().forEach(product -> {
            product.getUsersFavorite().remove(user);
            productRepository.save(product);
        });
        userRepository.delete(user);
        return user;
    }

    @Override
    @Transactional
    public UserDto addFavoriteProduct (Long id, Long productId) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        Product product = productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
        product.getUsersFavorite().add(user);
        productRepository.save(product);
        return mapper.toDto(user);
    }

    @Override
    @Transactional
    public Set<Product> getAllFavoriteProducts (Long id) {
        return userRepository.findById(id)
                .map(User::getFavoriteProducts)
                .orElseThrow(UserNotFoundException::new);
    }

//    @Override
//    public UserDto ratingProduct(Long productId, Long userId, int rate) {
//        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
//        Product product = productRepository.findById(productId).orElseThrow(ProductNotFoundException::new);
//        user.getRatingProducts().add(product);
//        user.getRatings().put(product, rate);
//        user = userRepository.save(user);
//        return mapper.toDto(user);
//    }

}
