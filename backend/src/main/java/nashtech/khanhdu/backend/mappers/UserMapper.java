package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto (User entity);

    User toEntity (CreateUserDto dto);

    User updateEntity (@MappingTarget User user, UpdateUserDto dto);

}
