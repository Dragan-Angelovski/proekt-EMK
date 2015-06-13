package mk.ukim.finki.wp.web.resources;

import mk.ukim.finki.wp.model.Seller;
import mk.ukim.finki.wp.service.CrudSellerService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/sellers")
public class SellerResource extends CrudResource<Seller, CrudSellerService> {

	@Autowired
	private CrudSellerService service;

	@Override
	public CrudSellerService getService() {
		return service;
	}

	

}
