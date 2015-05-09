package mk.ukim.finki.wp.web.resources;

import mk.ukim.finki.wp.model.Book;
import mk.ukim.finki.wp.service.BookService;
import mk.ukim.finki.wp.web.CrudResource;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/data/rest/books")
public class BookResource extends CrudResource<Book, BookService> {

    @Autowired
    private BookService service;

    @PersistenceContext
    private EntityManager em;

    @Override
    public BookService getService() {
        return service;
    }

    @RequestMapping(value = "/by_category/{id}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Book> getByCategoryId(@PathVariable Long id,
                                      HttpServletRequest request, HttpSession session) {
        return getService().findByCategoryId(id);
    }

    @RequestMapping(value = "/promoted", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Book> getPromotedBooks() {
        return getService().findPromotedBooks();
    }


    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = "application/json")
    public List search(@RequestParam String text) {
        return service.search(text);
    }

}
