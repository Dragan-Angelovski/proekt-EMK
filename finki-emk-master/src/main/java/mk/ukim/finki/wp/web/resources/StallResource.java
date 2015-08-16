package mk.ukim.finki.wp.web.resources;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import mk.ukim.finki.wp.model.Stall;
import mk.ukim.finki.wp.service.CrudStallService;
import mk.ukim.finki.wp.web.CrudResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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

	@RequestMapping(value = "/by_seller/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<Stall> getBySellerId(@PathVariable Long id,
			HttpServletRequest request, HttpSession session) {
		return getService().findBySellerId(id);
	}
	

}
