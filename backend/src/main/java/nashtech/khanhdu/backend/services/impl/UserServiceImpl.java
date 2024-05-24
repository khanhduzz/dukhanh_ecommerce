package nashtech.khanhdu.backend.services.impl;

import org.springframework.transaction.annotation.Transactional;
import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.data.repositories.ProductRepository;
import nashtech.khanhdu.backend.data.repositories.RoleRepository;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.SignUpDto;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserMapper mapper;
    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper mapper,
                           ProductRepository productRepository,
                           RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.productRepository = productRepository;
        this.roleRepository = roleRepository;
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
        var user = userRepository.findByUsername(dto.getUsername());
        if (user.isPresent()) {
            throw new UserAlreadyExistedException();
        }

        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        var newUser = new User();
        newUser = mapper.toEntity(dto);
        newUser.setPassword(encryptedPassword);
        if (!dto.getRole().isEmpty()) {
            var userRole = roleRepository.findAllById(dto.getRole());
            if (userRole.size() != dto.getRole().size()) {
                throw new UserAlreadyExistedException("Role not found");
            }
            newUser.setRoles(new HashSet<>(userRole));
        }
        userRepository.save(newUser);
        return mapper.toDto(newUser);
    }

    @Transactional
    public UserDetails signUp (SignUpDto data) throws UserAlreadyExistedException {
        var user = userRepository.findOneByUsername(data.username());
        if ( user.isPresent() ) {
            throw new UserAlreadyExistedException("Username already exists");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        var newUser = new User();
        newUser.setPassword(encryptedPassword);
        newUser.setUsername(data.username());
        if ( !data.roles().isEmpty() ) {
            var userRoles = roleRepository.findAllById(data.roles());
            if ( userRoles.size() != data.roles().size() ) {
                throw new UserAlreadyExistedException("Role not found");
            }
            newUser.setRoles(new HashSet<>(userRoles));
        }

        return userRepository.save(newUser);
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UserNotFoundException("User not found"));
    }
}
