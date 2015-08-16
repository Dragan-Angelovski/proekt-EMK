package mk.ukim.finki.wp.web.resources;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import mk.ukim.finki.wp.model.Seller;
import mk.ukim.finki.wp.service.CrudSellerService;
import mk.ukim.finki.wp.service.UserService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/sellers")
public class SellerResource extends CrudResource<Seller, CrudSellerService> {

	@Autowired
	private UserService userService;
	@Autowired
	private CrudSellerService service;

	@Override
	public CrudSellerService getService() {
		return service;
	}

	@RequestMapping(value = "by_user/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public Seller getByUserId(@PathVariable Long userId) {
		System.out.println("userid" + userId);
		return getService().findByUserId(userId);
	}
	
	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	public Seller create(@RequestBody @Valid Seller entity, HttpServletRequest request,
			HttpServletResponse response) {
		
		userService.save(entity.getUser());
		service.save(entity);
		
		return entity;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "application/json")
	public void delete(@PathVariable Long id, HttpServletRequest request,
			HttpServletResponse response) {
		Seller seller = service.findOne(id);
		service.delete(id);
		userService.delete(seller.getUser().getId());
	}
}