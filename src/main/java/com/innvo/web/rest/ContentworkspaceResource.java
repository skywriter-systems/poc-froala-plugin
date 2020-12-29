package com.innvo.web.rest;

import com.innvo.domain.Contentworkspace;
import com.innvo.repository.ContentworkspaceRepository;
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
 * REST controller for managing {@link com.innvo.domain.Contentworkspace}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ContentworkspaceResource {

    private final Logger log = LoggerFactory.getLogger(ContentworkspaceResource.class);

    private static final String ENTITY_NAME = "contentworkspace";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContentworkspaceRepository contentworkspaceRepository;

    public ContentworkspaceResource(ContentworkspaceRepository contentworkspaceRepository) {
        this.contentworkspaceRepository = contentworkspaceRepository;
    }

    /**
     * {@code POST  /contentworkspaces} : Create a new contentworkspace.
     *
     * @param contentworkspace the contentworkspace to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contentworkspace, or with status {@code 400 (Bad Request)} if the contentworkspace has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contentworkspaces")
    public ResponseEntity<Contentworkspace> createContentworkspace(@Valid @RequestBody Contentworkspace contentworkspace) throws URISyntaxException {
        log.debug("REST request to save Contentworkspace : {}", contentworkspace);
        if (contentworkspace.getId() != null) {
            throw new BadRequestAlertException("A new contentworkspace cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contentworkspace result = contentworkspaceRepository.save(contentworkspace);
        return ResponseEntity.created(new URI("/api/contentworkspaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contentworkspaces} : Updates an existing contentworkspace.
     *
     * @param contentworkspace the contentworkspace to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contentworkspace,
     * or with status {@code 400 (Bad Request)} if the contentworkspace is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contentworkspace couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contentworkspaces")
    public ResponseEntity<Contentworkspace> updateContentworkspace(@Valid @RequestBody Contentworkspace contentworkspace) throws URISyntaxException {
        log.debug("REST request to update Contentworkspace : {}", contentworkspace);
        if (contentworkspace.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contentworkspace result = contentworkspaceRepository.save(contentworkspace);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contentworkspace.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contentworkspaces} : get all the contentworkspaces.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contentworkspaces in body.
     */
    @GetMapping("/contentworkspaces")
    public ResponseEntity<List<Contentworkspace>> getAllContentworkspaces(Pageable pageable) {
        log.debug("REST request to get a page of Contentworkspaces");
        Page<Contentworkspace> page = contentworkspaceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contentworkspaces/:id} : get the "id" contentworkspace.
     *
     * @param id the id of the contentworkspace to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contentworkspace, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contentworkspaces/{id}")
    public ResponseEntity<Contentworkspace> getContentworkspace(@PathVariable Long id) {
        log.debug("REST request to get Contentworkspace : {}", id);
        Optional<Contentworkspace> contentworkspace = contentworkspaceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contentworkspace);
    }

    /**
     * {@code DELETE  /contentworkspaces/:id} : delete the "id" contentworkspace.
     *
     * @param id the id of the contentworkspace to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contentworkspaces/{id}")
    public ResponseEntity<Void> deleteContentworkspace(@PathVariable Long id) {
        log.debug("REST request to delete Contentworkspace : {}", id);
        contentworkspaceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
