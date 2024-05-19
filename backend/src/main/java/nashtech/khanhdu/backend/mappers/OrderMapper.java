package nashtech.khanhdu.backend.mappers;

import nashtech.khanhdu.backend.data.entities.Order;
import nashtech.khanhdu.backend.dto.request.CreateOrderDto;
import nashtech.khanhdu.backend.dto.request.UpdateOrderDto;
import nashtech.khanhdu.backend.dto.response.OrderDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderDto toDto (Order order);

    Order toEntity (CreateOrderDto dto);

    Order updateEntity (@MappingTarget Order order, UpdateOrderDto dto);

}
