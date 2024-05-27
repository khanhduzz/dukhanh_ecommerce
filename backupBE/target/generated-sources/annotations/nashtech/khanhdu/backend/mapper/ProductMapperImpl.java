package nashtech.khanhdu.backend.mapper;

import javax.annotation.processing.Generated;
import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Product;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-24T22:23:24+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDto toDto(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDto productDto = new ProductDto();

        productDto.setId( product.getId() );
        productDto.setName( product.getName() );
        productDto.setPrice( product.getPrice() );
        productDto.setDescription( product.getDescription() );
        productDto.setRating( product.getRating() );
        productDto.setFeatured( product.getFeatured() );

        return productDto;
    }

    @Override
    public Product toEntity(ProductDto dto) {
        if ( dto == null ) {
            return null;
        }

        Product product = new Product();

        product.setId( dto.getId() );
        product.setName( dto.getName() );
        product.setPrice( dto.getPrice() );
        product.setDescription( dto.getDescription() );
        product.setRating( dto.getRating() );
        product.setFeatured( dto.getFeatured() );

        return product;
    }

    @Override
    public Product updateProduct(Product product, ProductDto dto) {
        if ( dto == null ) {
            return product;
        }

        product.setId( dto.getId() );
        product.setName( dto.getName() );
        product.setPrice( dto.getPrice() );
        product.setDescription( dto.getDescription() );
        product.setRating( dto.getRating() );
        product.setFeatured( dto.getFeatured() );

        return product;
    }
}
