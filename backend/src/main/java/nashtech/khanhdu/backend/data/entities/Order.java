package nashtech.khanhdu.backend.data.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "orders")
public class Order extends AuditEntity<Long>{

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST})
    private Product product;

    private int quantity;

    public Order(User user, Product product, int quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

}
