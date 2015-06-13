package mk.ukim.finki.wp.service;

import java.util.List;

import mk.ukim.finki.wp.model.Stall;

public interface CrudStallService extends BaseEntityCrudService<Stall> {

	public List<Stall> findBySellerId(Long id);

}

