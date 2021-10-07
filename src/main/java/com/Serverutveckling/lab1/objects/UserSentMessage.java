package com.Serverutveckling.lab1.objects;


import org.apache.catalina.User;

/**
 * Object modeling a user who has sent a message
 */
public class UserSentMessage {

    private String username;
    private boolean is_Read;
    private String UUID;

    public UserSentMessage(){
        this.username = "";
        this.is_Read = false;
        this.UUID = "";
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getUsername() {
        return username;
    }

    public void setIs_Read(boolean is_Read) {
        this.is_Read = is_Read;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean getIs_Read(){
        return this.is_Read;
    }

}
