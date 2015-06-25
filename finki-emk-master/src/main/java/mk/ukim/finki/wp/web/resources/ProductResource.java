package mk.ukim.finki.wp.web.resources;

import java.util.List;

import mk.ukim.finki.wp.model.Product;
import mk.ukim.finki.wp.service.CrudProductService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/products")
public class ProductResource extends CrudResource<Product, CrudProductService> {

	@Autowired
	private CrudProductService service;

	@Override
	public CrudProductService getService() {
		return service;
	}

	@RequestMapping(value = "/by_category/{id}", method = RequestMethod.GET, produces = "application/json")
	public List<Product> getByCategoryId(@PathVariable Long id) {
		return getService().findByCategoryId(id);
	}
	
	@RequestMapping(value = "/by_type/{id}", method = RequestMethod.GET, produces = "application/json")
	public List<Product> getByTypeId(@PathVariable Long id) {
		return getService().findByTypeId(id);
	}
	
	@RequestMapping(value = "/by_stall/{id}", method = RequestMethod.GET, produces = "application/json")
	public List<Product> getByStallId(@PathVariable Long id) {
		return getService().findByStallId(id);
	}
	
	@RequestMapping(value = "/by_seller/{id}", method = RequestMethod.GET, produces = "application/json")
	public List<Product> getBySellerId(@PathVariable Long id) {
		return getService().findBySellerId(id);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET, produces = "application/json")
    public List search(@RequestParam String text) {
        return service.search(text);
    }

}
