package mk.ukim.finki.wp.web.resources;

import mk.ukim.finki.wp.model.TypeProduct;
import mk.ukim.finki.wp.service.CrudTypeService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/types")
public class TypeResource extends
		CrudResource<TypeProduct, CrudTypeService> {

	@Autowired
	private CrudTypeService service;

	@Override
	public CrudTypeService getService() {
		return service;
	}

}
