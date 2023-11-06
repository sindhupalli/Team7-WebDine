package com.web.webdine.service;

import com.stripe.exception.StripeException;
import com.web.webdine.model.Order;
import com.web.webdine.model.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
