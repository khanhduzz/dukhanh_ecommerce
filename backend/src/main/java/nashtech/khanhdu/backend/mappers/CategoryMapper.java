package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.Category;
import nashtech.khanhdu.backend.dto.request.CreateCategoryDto;
import nashtech.khanhdu.backend.dto.request.UpdateCategoryDto;
import nashtech.khanhdu.backend.dto.response.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDto toDto (Category category);

    Category toEntity (CreateCategoryDto dto);

    Category updateEntity (@MappingTarget Category category, UpdateCategoryDto dto);

}
