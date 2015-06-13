package mk.ukim.finki.wp.service;

import java.util.List;

import mk.ukim.finki.wp.model.OrderItem_GreenMarket;

public interface OrderItemService extends BaseEntityCrudService<OrderItem_GreenMarket> {

  List<OrderItem_GreenMarket> findByUserToken(String s);
}
