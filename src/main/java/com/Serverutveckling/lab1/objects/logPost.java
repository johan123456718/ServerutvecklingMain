package com.Serverutveckling.lab1.objects;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * A object modeling for creating a log post
 */
@Entity
public class logPost implements Comparable<logPost>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;

    private String sender;
    private String reciever;

    private String title;
    private String description;
    private LocalDate _date;            //Dateformater

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getUser_UUID() {
        return sender;
    }

    public void setUser_UUID(String user_UUID) {
        this.sender = user_UUID;
    }

    public String getRecipient_UUID() {
        return reciever;
    }

    public void setRecipient_UUID(String recipient_UUID) {
        this.reciever = recipient_UUID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate get_date() {
        return _date;
    }

    public void set_date(LocalDate _date) {
        this._date = _date;
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }
    @Override
    public int compareTo(logPost log) {
        int result = this.getID().compareTo(log.ID);
        if(result == 0) {
            return this.getID().compareTo(log.ID);
        }else{
            return result;
        }
    }

}
