package cia.group6.repositories;

import cia.group6.entities.Listitems;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class TaskRepository {
	Connection connection = null;
	PreparedStatement loginStatement = null;
	ResultSet loginResultSet = null;


    //@Inject
    @PersistenceContext(unitName="sprint2")
    private EntityManager em;

    public Listitems findByUser(Long id) {
        return em.find(Listitems.class, id);
    }

    public List<Listitems> findByName(String name) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Listitems> criteria = cb.createQuery(Listitems.class);
        Root<Listitems> tasks = criteria.from(Listitems.class);
        // Swap criteria statements if you would like to try out type-safe criteria queries, a new
        // feature in JPA 2.0
        // criteria.select(member).where(cb.equal(member.get(Member_.name), email));
        criteria.select(tasks).where(cb.equal(tasks.get("username"), name));
        return em.createQuery(criteria).getResultList();
    }

    public List<Listitems> findAllOrderedByName() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Listitems> criteria = cb.createQuery(Listitems.class);
        Root<Listitems> listitems = criteria.from(Listitems.class);
        // Swap criteria statements if you would like to try out type-safe criteria queries, a new
        // feature in JPA 2.0
        // criteria.select(member).orderBy(cb.asc(member.get(Member_.name)));
        criteria.select(listitems).orderBy(cb.asc(listitems.get("id")));
        return em.createQuery(criteria).getResultList();
    }
    
	public void deleteTask(int taskId) {
		//<UserStory05Structure> us05List = new ArrayList<UserStory05Structure>();
		
		em.remove(em.find(Listitems.class, taskId));
		
	}
	
	@SuppressWarnings("unchecked")
	public List <Listitems> getItemsByUser(String userName) {
		return em.createNativeQuery("SELECT * FROM Listitems WHERE username = ?").setParameter(1, userName).getResultList();
	
	
	}
    
	
	public void editItem(int itemID, String task) {
		em.createNativeQuery("UPDATE Listitems SET task = ? WHERE id = ?").setParameter(1, task).setParameter(2, itemID).executeUpdate();
	}
    
}
