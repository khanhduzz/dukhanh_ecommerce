package nashtech.khanhdu.backend.services.impl;

import jakarta.transaction.Transactional;
import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.data.repositories.UserRepository;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.UserDto;
import nashtech.khanhdu.backend.exceptions.UserNotFoundException;
import nashtech.khanhdu.backend.mappers.UserMapper;
import nashtech.khanhdu.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private UserMapper mapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
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
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return user;
                }).orElseThrow(UserNotFoundException::new);
    }
}
