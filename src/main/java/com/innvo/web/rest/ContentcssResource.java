package com.innvo.web.rest;

import com.innvo.domain.Contentcss;
import com.innvo.repository.ContentcssRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api")
@Transactional
public class ContentcssResource {

    private final Logger log = LoggerFactory.getLogger(ContentcssResource.class);

    @Autowired
    private ContentcssRepository contentcssRepository;

    @GetMapping("/contentcss")
    public ResponseEntity<List<Contentcss>> getAll() {
        List<Contentcss> contentcsses =contentcssRepository.findAll();
        return ResponseEntity.ok().body(contentcsses);
    }
}
