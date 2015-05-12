package mk.ukim.finki.wp.repository;

import java.util.List;

import mk.ukim.finki.wp.model.TypeProduct;

public interface TypeRepository extends JpaSpecificationRepository<TypeProduct> {
	   List<TypeProduct> findByCategoryId(Long id);

}
