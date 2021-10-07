package com.Serverutveckling.lab1.objects;


import javax.persistence.*;

/**
 * A object modeling for creating a user
 */
@Entity
public class Users implements Comparable<Users>{

    @Id
    private String UUID;

    private String username;

    private String password;

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public int compareTo(Users o) {
        int result = this.getUUID().compareTo(o.UUID);
        if(result == 0) {
            return this.getUUID().compareTo(o.UUID);
        }else{
            return result;
        }
    }
}
