package com.innvo.web.rest;

import com.innvo.FroalaApp;
import com.innvo.domain.Contentworkspace;
import com.innvo.repository.ContentworkspaceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ContentworkspaceResource} REST controller.
 */
@SpringBootTest(classes = FroalaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContentworkspaceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ContentworkspaceRepository contentworkspaceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContentworkspaceMockMvc;

    private Contentworkspace contentworkspace;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentworkspace createEntity(EntityManager em) {
        Contentworkspace contentworkspace = new Contentworkspace()
            .name(DEFAULT_NAME);
        return contentworkspace;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentworkspace createUpdatedEntity(EntityManager em) {
        Contentworkspace contentworkspace = new Contentworkspace()
            .name(UPDATED_NAME);
        return contentworkspace;
    }

    @BeforeEach
    public void initTest() {
        contentworkspace = createEntity(em);
    }

    @Test
    @Transactional
    public void createContentworkspace() throws Exception {
        int databaseSizeBeforeCreate = contentworkspaceRepository.findAll().size();
        // Create the Contentworkspace
        restContentworkspaceMockMvc.perform(post("/api/contentworkspaces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentworkspace)))
            .andExpect(status().isCreated());

        // Validate the Contentworkspace in the database
        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeCreate + 1);
        Contentworkspace testContentworkspace = contentworkspaceList.get(contentworkspaceList.size() - 1);
        assertThat(testContentworkspace.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createContentworkspaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contentworkspaceRepository.findAll().size();

        // Create the Contentworkspace with an existing ID
        contentworkspace.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContentworkspaceMockMvc.perform(post("/api/contentworkspaces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentworkspace)))
            .andExpect(status().isBadRequest());

        // Validate the Contentworkspace in the database
        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentworkspaceRepository.findAll().size();
        // set the field null
        contentworkspace.setName(null);

        // Create the Contentworkspace, which fails.


        restContentworkspaceMockMvc.perform(post("/api/contentworkspaces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentworkspace)))
            .andExpect(status().isBadRequest());

        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContentworkspaces() throws Exception {
        // Initialize the database
        contentworkspaceRepository.saveAndFlush(contentworkspace);

        // Get all the contentworkspaceList
        restContentworkspaceMockMvc.perform(get("/api/contentworkspaces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contentworkspace.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getContentworkspace() throws Exception {
        // Initialize the database
        contentworkspaceRepository.saveAndFlush(contentworkspace);

        // Get the contentworkspace
        restContentworkspaceMockMvc.perform(get("/api/contentworkspaces/{id}", contentworkspace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contentworkspace.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingContentworkspace() throws Exception {
        // Get the contentworkspace
        restContentworkspaceMockMvc.perform(get("/api/contentworkspaces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContentworkspace() throws Exception {
        // Initialize the database
        contentworkspaceRepository.saveAndFlush(contentworkspace);

        int databaseSizeBeforeUpdate = contentworkspaceRepository.findAll().size();

        // Update the contentworkspace
        Contentworkspace updatedContentworkspace = contentworkspaceRepository.findById(contentworkspace.getId()).get();
        // Disconnect from session so that the updates on updatedContentworkspace are not directly saved in db
        em.detach(updatedContentworkspace);
        updatedContentworkspace
            .name(UPDATED_NAME);

        restContentworkspaceMockMvc.perform(put("/api/contentworkspaces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContentworkspace)))
            .andExpect(status().isOk());

        // Validate the Contentworkspace in the database
        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeUpdate);
        Contentworkspace testContentworkspace = contentworkspaceList.get(contentworkspaceList.size() - 1);
        assertThat(testContentworkspace.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingContentworkspace() throws Exception {
        int databaseSizeBeforeUpdate = contentworkspaceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContentworkspaceMockMvc.perform(put("/api/contentworkspaces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentworkspace)))
            .andExpect(status().isBadRequest());

        // Validate the Contentworkspace in the database
        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContentworkspace() throws Exception {
        // Initialize the database
        contentworkspaceRepository.saveAndFlush(contentworkspace);

        int databaseSizeBeforeDelete = contentworkspaceRepository.findAll().size();

        // Delete the contentworkspace
        restContentworkspaceMockMvc.perform(delete("/api/contentworkspaces/{id}", contentworkspace.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contentworkspace> contentworkspaceList = contentworkspaceRepository.findAll();
        assertThat(contentworkspaceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
