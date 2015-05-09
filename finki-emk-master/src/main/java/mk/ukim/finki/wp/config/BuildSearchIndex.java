package mk.ukim.finki.wp.config;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Component
public class BuildSearchIndex implements ApplicationListener<ContextRefreshedEvent> {

    @PersistenceContext
    private EntityManager em;

    /**
     * Create an initial Lucene index for the data already present in the
     * database. This method is called during Spring's startup.
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        System.out.println("EVENT " + event);
        try {
            FullTextEntityManager fullTextEntityManager
                    = Search.getFullTextEntityManager(em);
            fullTextEntityManager.createIndexer().startAndWait();
            System.out.println("### HIBERNATE SEARCH INDEXER");
        } catch (InterruptedException e) {
            System.out.println(
                    "An error occurred trying to build the serach index: "
                            + e.toString());
        }
        return;
    }

}
