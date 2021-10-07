package com.Serverutveckling.lab1.controller;

import com.Serverutveckling.lab1.db.DbInterface;
import com.Serverutveckling.lab1.db.DbManager;
import com.Serverutveckling.lab1.objects.Message;
import com.Serverutveckling.lab1.objects.UserSentMessage;
import com.Serverutveckling.lab1.objects.Users;
import com.Serverutveckling.lab1.objects.logPost;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.ok;


/**
 * Controller handling REST calls
 */
@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/demo", method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST}, produces = { "application/json; charset=utf-8" })
public class RestController {

    @Autowired
    DbInterface DbManager = new DbManager();

    @GetMapping(path="/resultLogs")
    public @ResponseBody Iterable<logPost> getAllResultLogs (@RequestParam String uuid) {
        return DbManager.getLogsByUuid(uuid);
    }

    @GetMapping(path="/messages")
    public @ResponseBody Iterable<Message> getAllMessages (@RequestParam String uuid, @RequestParam String sender) {
        return DbManager.getMessages(uuid, sender);
    }

    @GetMapping(path="/usernames")
    public @ResponseBody
    ArrayList<Users> getUsernames(@RequestParam String uuid){
        return DbManager.getUsernames(uuid);
    }

    @GetMapping(path="/senders")
    public @ResponseBody
    ArrayList<UserSentMessage> getSenders(@RequestParam String uuid){
        return DbManager.getSenders(uuid);
    }

    @PostMapping(path="/addMessage")
    public @ResponseBody String addMessage(@RequestParam String message, @RequestParam String uuid, @RequestParam String reciever) throws JSONException {
        return DbManager.updateMessage(message, uuid, reciever);
    }

    @PostMapping(path="/addLog")
    public @ResponseBody String addLog(@RequestParam String message, @RequestParam String title, @RequestParam String uuid, @RequestParam String reciever) throws JSONException {
        return DbManager.updateLog(message, title, uuid, reciever);
    }

    @PostMapping(path = "/signIn")
    public @ResponseBody ResponseEntity signIn(@RequestParam String username, @RequestParam String password){
        try{
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("uuid", DbManager.signIn(username, password));
            return ok(model);
        }catch (Exception e) {
            e.printStackTrace();
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @PostMapping(path = "/register")
    public @ResponseBody ResponseEntity register(@RequestParam String username, @RequestParam String password){
        try{
            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("uuid", DbManager.registerUser(username, password));
            return ok(model);
        }catch (Exception e) {
            e.printStackTrace();
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

}
