package nashtech.khanhdu.backend.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Product;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-05T11:40:27+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDto toDto(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDto.ProductDtoBuilder productDto = ProductDto.builder();

        productDto.id( product.getId() );
        productDto.name( product.getName() );
        productDto.price( product.getPrice() );
        productDto.description( product.getDescription() );
        productDto.rating( product.getRating() );
        productDto.featured( product.getFeatured() );
        List<String> list = product.getImage();
        if ( list != null ) {
            productDto.image( new ArrayList<String>( list ) );
        }

        return productDto.build();
    }

    @Override
    public Product toEntity(ProductDto dto) {
        if ( dto == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.name( dto.getName() );
        product.price( dto.getPrice() );
        product.description( dto.getDescription() );
        product.rating( dto.getRating() );
        product.featured( dto.getFeatured() );
        List<String> list = dto.getImage();
        if ( list != null ) {
            product.image( new ArrayList<String>( list ) );
        }

        return product.build();
    }

    @Override
    public Product updateProduct(Product product, ProductDto dto) {
        if ( dto == null ) {
            return product;
        }

        product.setName( dto.getName() );
        product.setPrice( dto.getPrice() );
        product.setDescription( dto.getDescription() );
        product.setRating( dto.getRating() );
        product.setFeatured( dto.getFeatured() );
        if ( product.getImage() != null ) {
            List<String> list = dto.getImage();
            if ( list != null ) {
                product.getImage().clear();
                product.getImage().addAll( list );
            }
            else {
                product.setImage( null );
            }
        }
        else {
            List<String> list = dto.getImage();
            if ( list != null ) {
                product.setImage( new ArrayList<String>( list ) );
            }
        }

        return product;
    }
}
