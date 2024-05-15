package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.Access;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.accessibility.AccessibleRole;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product extends AuditEntity<Long>{

    private String name;
    private String description;
    private double price;
    private String image;
    private double rating;
    private int isFeatured;
    private int currentQuantity;
    private String category;

//    private List<Category> categoryList;

}
