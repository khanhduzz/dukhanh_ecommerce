package nashtech.khanhdu.backend.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "products")
public class Product extends AuditEntity<Long>{

    private String name;
    private String description;
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    private int currentQuantity;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JsonIgnore
    @JoinTable(
            name = "USERS_FAVORITE_PRODUCTS",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "PRODUCT_ID")
    )
    private Set<User> usersFavorite;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST})
    @JsonIgnore
    @JoinTable(
            name = "PRODUCTS_CATEGORIES",
            joinColumns = @JoinColumn(name = "CATEGORY_ID"),
            inverseJoinColumns = @JoinColumn(name = "PRODUCT_ID")
    )
    private Set<Category> categories;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<UserProductRating> productRatings;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Order> usersOrder;
}
