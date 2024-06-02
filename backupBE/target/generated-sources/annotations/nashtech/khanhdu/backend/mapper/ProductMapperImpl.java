package nashtech.khanhdu.backend.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import nashtech.khanhdu.backend.dto.ProductDto;
import nashtech.khanhdu.backend.entities.Product;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-01T16:18:18+0700",
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

        productDto.setName( product.getName() );
        productDto.setPrice( product.getPrice() );
        productDto.setDescription( product.getDescription() );
        productDto.setRating( product.getRating() );
        productDto.setFeatured( product.getFeatured() );
        List<String> list = product.getImage();
        if ( list != null ) {
            productDto.setImage( new ArrayList<String>( list ) );
        }

        return productDto;
    }

    @Override
    public Product toEntity(ProductDto dto) {
        if ( dto == null ) {
            return null;
        }

        Product product = new Product();

        product.setName( dto.getName() );
        product.setPrice( dto.getPrice() );
        product.setDescription( dto.getDescription() );
        product.setRating( dto.getRating() );
        product.setFeatured( dto.getFeatured() );
        List<String> list = dto.getImage();
        if ( list != null ) {
            product.setImage( new ArrayList<String>( list ) );
        }

        return product;
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
