package mk.ukim.finki.wp.web.resources;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import mk.ukim.finki.wp.model.TypeProduct;
import mk.ukim.finki.wp.service.CrudTypeService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/types")
public class TypeResource extends CrudResource<TypeProduct, CrudTypeService> {

	@Autowired
	private CrudTypeService service;

	@Override
	public CrudTypeService getService() {
		return service;
	}

	@RequestMapping(value = "/by_category/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<TypeProduct> getByCategoryId(@PathVariable Long id,
			HttpServletRequest request, HttpSession session) {
		return getService().findByCategoryId(id);
	}

}
