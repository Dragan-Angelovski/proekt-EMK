package mk.ukim.finki.wp.repository;

import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.model.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaSpecificationRepository<OrderItem> {

  List<OrderItem> findByUserToken(String s);
}
