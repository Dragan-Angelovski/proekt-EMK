package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.OrderItem_GreenMarket;

public interface OrderItemRepository extends JpaSpecificationRepository<OrderItem_GreenMarket> {

  List<OrderItem_GreenMarket> findByUserToken(String s);
}
