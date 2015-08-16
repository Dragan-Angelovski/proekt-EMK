package mk.ukim.finki.wp.service;

import mk.ukim.finki.wp.model.Seller;

public interface CrudSellerService extends BaseEntityCrudService<Seller> {

	Seller findByUserId(Long id);
}

