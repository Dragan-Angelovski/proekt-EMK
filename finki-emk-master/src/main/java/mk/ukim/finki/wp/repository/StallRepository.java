package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.Stall;

public interface StallRepository extends JpaSpecificationRepository<Stall> {
   
	List<Stall> findBySellerId(Long id);
}
