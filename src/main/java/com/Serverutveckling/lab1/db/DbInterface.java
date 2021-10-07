package com.Serverutveckling.lab1.db;

import com.Serverutveckling.lab1.objects.Message;
import com.Serverutveckling.lab1.objects.UserSentMessage;
import com.Serverutveckling.lab1.objects.Users;
import com.Serverutveckling.lab1.objects.logPost;
import org.json.JSONException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Interface declaring methods used for handling communication with a database
 */
@Component
public interface DbInterface {

    public Iterable<logPost> getAllLogs();

    public Iterable<logPost> getLogsByUuid(String uuid);

    public Iterable<Message> getMessages(String uuid, String sender);

    public ArrayList<Users> getUsernames(String uuid);

    public ArrayList<UserSentMessage> getSenders(String uuid);

    String updateMessage(String message, String uuid, String reciever) throws JSONException;

    String updateLog(String message, String title, String uuid, String recipient_uuid);

    String signIn(String username, String password);

    String registerUser(String username, String password);


}
