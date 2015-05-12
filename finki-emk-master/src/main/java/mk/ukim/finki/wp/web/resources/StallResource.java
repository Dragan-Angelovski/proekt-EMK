package mk.ukim.finki.wp.web.resources;

import mk.ukim.finki.wp.model.Stall;
import mk.ukim.finki.wp.service.CrudStallService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/rest/stalls")
public class StallResource extends CrudResource<Stall, CrudStallService> {

	@Autowired
	private CrudStallService service;

	@Override
	public CrudStallService getService() {
		return service;
	}

	

}
