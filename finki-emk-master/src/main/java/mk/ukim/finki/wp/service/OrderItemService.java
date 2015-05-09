package mk.ukim.finki.wp.service;

import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.model.OrderItem;

import java.util.List;

public interface OrderItemService extends BaseEntityCrudService<OrderItem> {

  List<OrderItem> findByUserToken(String s);
}
