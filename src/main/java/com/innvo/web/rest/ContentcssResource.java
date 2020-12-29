package com.innvo.web.rest;

import com.innvo.domain.Contentcss;
import com.innvo.repository.ContentcssRepository;
import com.innvo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.innvo.domain.Contentcss}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContentcssResource {

    private final Logger log = LoggerFactory.getLogger(ContentcssResource.class);

    private static final String ENTITY_NAME = "contentcss";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContentcssRepository contentcssRepository;

    public ContentcssResource(ContentcssRepository contentcssRepository) {
        this.contentcssRepository = contentcssRepository;
    }

    /**
     * {@code POST  /contentcsses} : Create a new contentcss.
     *
     * @param contentcss the contentcss to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contentcss, or with status {@code 400 (Bad Request)} if the contentcss has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contentcsses")
    public ResponseEntity<Contentcss> createContentcss(@Valid @RequestBody Contentcss contentcss) throws URISyntaxException {
        log.debug("REST request to save Contentcss : {}", contentcss);
        if (contentcss.getId() != null) {
            throw new BadRequestAlertException("A new contentcss cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contentcss result = contentcssRepository.save(contentcss);
        return ResponseEntity.created(new URI("/api/contentcsses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contentcsses} : Updates an existing contentcss.
     *
     * @param contentcss the contentcss to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contentcss,
     * or with status {@code 400 (Bad Request)} if the contentcss is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contentcss couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contentcsses")
    public ResponseEntity<Contentcss> updateContentcss(@Valid @RequestBody Contentcss contentcss) throws URISyntaxException {
        log.debug("REST request to update Contentcss : {}", contentcss);
        if (contentcss.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contentcss result = contentcssRepository.save(contentcss);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contentcss.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contentcsses} : get all the contentcsses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contentcsses in body.
     */
    @GetMapping("/contentcsses")
    public ResponseEntity<List<Contentcss>> getAllContentcsses(Pageable pageable) {
        log.debug("REST request to get a page of Contentcsses");
        Page<Contentcss> page = contentcssRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contentcsses/:id} : get the "id" contentcss.
     *
     * @param id the id of the contentcss to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contentcss, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contentcsses/{id}")
    public ResponseEntity<Contentcss> getContentcss(@PathVariable Long id) {
        log.debug("REST request to get Contentcss : {}", id);
        Optional<Contentcss> contentcss = contentcssRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contentcss);
    }

    /**
     * {@code DELETE  /contentcsses/:id} : delete the "id" contentcss.
     *
     * @param id the id of the contentcss to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contentcsses/{id}")
    public ResponseEntity<Void> deleteContentcss(@PathVariable Long id) {
        log.debug("REST request to delete Contentcss : {}", id);
        contentcssRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
