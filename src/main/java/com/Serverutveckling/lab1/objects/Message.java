package com.Serverutveckling.lab1.objects;


import javax.persistence.*;
import java.time.LocalDate;

/**
 * A object modeling for creating a message
 */
@Entity
public class Message implements Comparable<Message> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;

    private String sender;

    private String reciever;

    private String body;

    private LocalDate _date;

    private boolean is_Read;

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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDate get_date() {
        return _date;
    }

    public void set_date(LocalDate _date) {
        this._date = _date;
    }

    public boolean isIs_read() {
        return is_Read;
    }

    public void setIs_read(boolean is_read) {
        this.is_Read = is_read;
    }

    @Override
    public int compareTo(Message o) {
        int result = this.getID().compareTo(o.ID);
        if(result == 0) {
            return this.getID().compareTo(o.ID);
        }else{
            return result;
        }
    }
}
