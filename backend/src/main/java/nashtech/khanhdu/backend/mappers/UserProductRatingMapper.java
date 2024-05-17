package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.UserProductRating;
import nashtech.khanhdu.backend.dto.request.CreateUserProductRatingDto;
import nashtech.khanhdu.backend.dto.request.UpdateUserProductRatingDto;
import nashtech.khanhdu.backend.dto.response.UserProductRatingDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserProductRatingMapper {

    UserProductRatingDto toEntity (UserProductRating userProductRating);

    UserProductRating toDto (CreateUserProductRatingDto dto);

    UserProductRating updateEntity (@MappingTarget UserProductRating userProductRating, UpdateUserProductRatingDto dto);

}
