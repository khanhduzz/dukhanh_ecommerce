package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.User;
import nashtech.khanhdu.backend.dto.request.CreateUserDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserDto;
import nashtech.khanhdu.backend.dto.response.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto (User entity);

    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "productRatings", ignore = true)
    @Mapping(target = "favoriteProducts", ignore = true)
    @Mapping(target = "orders", ignore = true)
    User toEntity (CreateUserDto dto);

    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "productRatings", ignore = true)
    @Mapping(target = "favoriteProducts", ignore = true)
    @Mapping(target = "orders", ignore = true)
    User updateEntity (@MappingTarget User user, UpdateUserDto dto);

}
