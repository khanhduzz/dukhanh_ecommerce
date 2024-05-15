package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.Product;
import nashtech.khanhdu.backend.dto.request.CreateProductDto;
import nashtech.khanhdu.backend.dto.request.UpdateProductDto;
import nashtech.khanhdu.backend.dto.response.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto toDto (Product entity);

    Product toEntity (CreateProductDto dto);

    Product updateEntity (@MappingTarget Product product, UpdateProductDto dto);

}
