package cia.group6.repositories;

import cia.group6.entities.User;

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
import java.util.List;

@ApplicationScoped
public class MemberRepository {
	Connection connection = null;
	PreparedStatement loginStatement = null;
	ResultSet loginResultSet = null;


    //@Inject
    @PersistenceContext(unitName="sprint2")
    private EntityManager em;

    public User findById(Long id) {
        return em.find(User.class, id);
    }

    public User findByName(String name) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = cb.createQuery(User.class);
        Root<User> user = criteria.from(User.class);
        // Swap criteria statements if you would like to try out type-safe criteria queries, a new
        // feature in JPA 2.0
        // criteria.select(member).where(cb.equal(member.get(Member_.name), email));
        criteria.select(user).where(cb.equal(user.get("username"), name));
        return em.createQuery(criteria).getSingleResult();
    }
    public User findByNameAndPass(String name, String password) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = cb.createQuery(User.class);
        Root<User> user = criteria.from(User.class);
        // Swap criteria statements if you would like to try out type-safe criteria queries, a new
        // feature in JPA 2.0
        // criteria.select(member).where(cb.equal(member.get(Member_.name), email));
        criteria.select(user).where(cb.equal(user.get("username"), name)).where(cb.equal(user.get("password"), password));
        return em.createQuery(criteria).getSingleResult();
    }
    public String[] getUserByNameAndPass(String name, String password){
		String loginQueryString = "SELECT username, password FROM User WHERE username = ? and password=?";
		String[] result = new String[2];
		//		String loginQueryString = "SELECT username, password, userType FROM User WHERE username = ? and password=?";
		try {
		connection = ConnectionFactory.getInstance().getConnection();
		loginStatement = connection.prepareStatement(loginQueryString);
		loginStatement.setString(1, name);
		loginStatement.setString(2, password);
		loginResultSet = loginStatement.executeQuery();		

		while (loginResultSet.next()) {			
			System.out.println("=========================================||||||||||||||||||||||||||||||||||||||||||||||||||---------------------------------------------------------------------");
			System.out.println(loginResultSet.getString(1));
			System.out.println(loginResultSet.getString(2));
			//System.out.println(loginResultSet.getString(3));
			System.out.println("=========================================||||||||||||||||||||||||||||||||||||||||||||||||||---------------------------------------------------------------------");
			result[0] = loginResultSet.getString(1);
			result[1] = loginResultSet.getString(2);
			//result[2] = loginResultSet.getString(3);
			return result;
		}
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return null;   	
    }
   
}
