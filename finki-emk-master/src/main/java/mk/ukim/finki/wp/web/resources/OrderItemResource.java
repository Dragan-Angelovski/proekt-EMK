package mk.ukim.finki.wp.web.resources;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mk.ukim.finki.wp.model.OrderItem_GreenMarket;
import mk.ukim.finki.wp.service.OrderItemService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/order_items")
public class OrderItemResource extends
        CrudResource<OrderItem_GreenMarket, OrderItemService> {

  @Autowired
  private OrderItemService service;

  @Override
  public OrderItemService getService() {
    return service;
  }

  @RequestMapping(method = RequestMethod.POST, produces = "application/json")
  public OrderItem_GreenMarket create(@RequestBody OrderItem_GreenMarket entity, HttpServletRequest request,
                          HttpServletResponse response) {
    entity.setUserToken(tempToken(request));
    getService().save(entity);
    return entity;
  }

  @RequestMapping(value = "/my", method = RequestMethod.GET, produces = "application/json")
  public List<OrderItem_GreenMarket> myOrderItems(HttpServletRequest request) {
    System.out.println("~~~~~~~~~"+tempToken(request));
      return  service.findByUserToken(tempToken(request));
  }

  @RequestMapping(value = "/check_pay", method = RequestMethod.POST, produces = "application/json")
  public void pay(HttpServletRequest request) {
    System.out.println("pay invoked");
  }

  public static String tempToken(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    for (Cookie c : cookies) {
      if (c.getName().equals("temp_token")) {
        return c.getValue();
      }
    }
    return null;
  }


}
