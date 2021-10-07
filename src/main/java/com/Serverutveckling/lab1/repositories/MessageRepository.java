package com.Serverutveckling.lab1.repositories;

import com.Serverutveckling.lab1.objects.Message;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * A repository for fetching message from a database
 */
public interface MessageRepository extends CrudRepository<Message, Integer> {
    Iterable<Message> findBySender(String UUID);

    ArrayList<Message> findByReciever(String uuid);

}
