package nashtech.khanhdu.backend.services;

import nashtech.khanhdu.backend.entities.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {

    public static Specification<Product> hasName (String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> isFeatured (Integer feature) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("featured"),feature);
    }

    public static Specification<Product> hasPriceAbove (Double minPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice);
    }

    public static Specification<Product> hasPriceBelow (Double maxPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
    }
}