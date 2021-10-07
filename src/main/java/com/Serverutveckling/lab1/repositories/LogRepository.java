package com.Serverutveckling.lab1.repositories;

import com.Serverutveckling.lab1.objects.Users;
import com.Serverutveckling.lab1.objects.logPost;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * A repostitory fetched logs from a database
 */
public interface LogRepository extends CrudRepository<logPost, Integer> {
    Iterable<logPost> findBySender(String UUID);
    Iterable<logPost> findByReciever(String UUID);
}
