package cia.group6.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * Entity implementation class for Entity: Listitems
 *
 */
@Entity

public class Listitems implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	private String task;
	
//	@ManyToOne(optional=false)
//	@JoinColumn(name="username", nullable=false, updatable=false)
	private String username;
	

	public Listitems() {

	}
	
	public Listitems(String task, String user){
		super();
		this.task = task;
		this.username = user;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
	
	public int getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}




