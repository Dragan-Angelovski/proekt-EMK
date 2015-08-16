package mk.ukim.finki.wp.repository;

import mk.ukim.finki.wp.model.Seller;

public interface SellerRepository extends JpaSpecificationRepository<Seller> {
	
	Seller findByUserId(Long id);
}
