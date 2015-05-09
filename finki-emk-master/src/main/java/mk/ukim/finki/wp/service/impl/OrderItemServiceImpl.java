package mk.ukim.finki.wp.service.impl;

import mk.ukim.finki.wp.model.Category;
import mk.ukim.finki.wp.model.OrderItem;
import mk.ukim.finki.wp.repository.CategoryRepository;
import mk.ukim.finki.wp.repository.OrderItemRepository;
import mk.ukim.finki.wp.service.CategoryService;
import mk.ukim.finki.wp.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Order;
import java.util.List;

@Service
public class OrderItemServiceImpl extends
        BaseEntityCrudServiceImpl<OrderItem, OrderItemRepository> implements
        OrderItemService {

  @Autowired
  private OrderItemRepository repository;

  @Override
  protected OrderItemRepository getRepository() {
    return repository;
  }

  @Override
  public List<OrderItem> findByUserToken(String s) {
    return getRepository().findByUserToken(s);
  }
}
