package mk.ukim.finki.wp.service.payment;

import java.util.List;

import mk.ukim.finki.wp.model.OrderItem_GreenMarket;

import com.paypal.api.payments.Address;
import com.paypal.api.payments.CreditCard;
import com.paypal.api.payments.Payment;

/**
 * Created by ristes on 6.5.15.
 */
public interface PaymentService {

  public Payment executeCreditCardPayment(Address billingAddress,
                                          CreditCard creditCard,
                                          List<OrderItem_GreenMarket> items);
}
