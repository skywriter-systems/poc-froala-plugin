package com.innvo.web.rest;

import com.innvo.FroalaApp;
import com.innvo.domain.Contentcss;
import com.innvo.repository.ContentcssRepository;

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
 * Integration tests for the {@link ContentcssResource} REST controller.
 */
@SpringBootTest(classes = FroalaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContentcssResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CSSURL = "AAAAAAAAAA";
    private static final String UPDATED_CSSURL = "BBBBBBBBBB";

    @Autowired
    private ContentcssRepository contentcssRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContentcssMockMvc;

    private Contentcss contentcss;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentcss createEntity(EntityManager em) {
        Contentcss contentcss = new Contentcss()
            .name(DEFAULT_NAME)
            .cssurl(DEFAULT_CSSURL);
        return contentcss;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentcss createUpdatedEntity(EntityManager em) {
        Contentcss contentcss = new Contentcss()
            .name(UPDATED_NAME)
            .cssurl(UPDATED_CSSURL);
        return contentcss;
    }

    @BeforeEach
    public void initTest() {
        contentcss = createEntity(em);
    }

    @Test
    @Transactional
    public void createContentcss() throws Exception {
        int databaseSizeBeforeCreate = contentcssRepository.findAll().size();
        // Create the Contentcss
        restContentcssMockMvc.perform(post("/api/contentcsses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentcss)))
            .andExpect(status().isCreated());

        // Validate the Contentcss in the database
        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeCreate + 1);
        Contentcss testContentcss = contentcssList.get(contentcssList.size() - 1);
        assertThat(testContentcss.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testContentcss.getCssurl()).isEqualTo(DEFAULT_CSSURL);
    }

    @Test
    @Transactional
    public void createContentcssWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contentcssRepository.findAll().size();

        // Create the Contentcss with an existing ID
        contentcss.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContentcssMockMvc.perform(post("/api/contentcsses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentcss)))
            .andExpect(status().isBadRequest());

        // Validate the Contentcss in the database
        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCssurlIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentcssRepository.findAll().size();
        // set the field null
        contentcss.setCssurl(null);

        // Create the Contentcss, which fails.


        restContentcssMockMvc.perform(post("/api/contentcsses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentcss)))
            .andExpect(status().isBadRequest());

        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContentcsses() throws Exception {
        // Initialize the database
        contentcssRepository.saveAndFlush(contentcss);

        // Get all the contentcssList
        restContentcssMockMvc.perform(get("/api/contentcsses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contentcss.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].cssurl").value(hasItem(DEFAULT_CSSURL)));
    }
    
    @Test
    @Transactional
    public void getContentcss() throws Exception {
        // Initialize the database
        contentcssRepository.saveAndFlush(contentcss);

        // Get the contentcss
        restContentcssMockMvc.perform(get("/api/contentcsses/{id}", contentcss.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contentcss.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.cssurl").value(DEFAULT_CSSURL));
    }
    @Test
    @Transactional
    public void getNonExistingContentcss() throws Exception {
        // Get the contentcss
        restContentcssMockMvc.perform(get("/api/contentcsses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContentcss() throws Exception {
        // Initialize the database
        contentcssRepository.saveAndFlush(contentcss);

        int databaseSizeBeforeUpdate = contentcssRepository.findAll().size();

        // Update the contentcss
        Contentcss updatedContentcss = contentcssRepository.findById(contentcss.getId()).get();
        // Disconnect from session so that the updates on updatedContentcss are not directly saved in db
        em.detach(updatedContentcss);
        updatedContentcss
            .name(UPDATED_NAME)
            .cssurl(UPDATED_CSSURL);

        restContentcssMockMvc.perform(put("/api/contentcsses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContentcss)))
            .andExpect(status().isOk());

        // Validate the Contentcss in the database
        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeUpdate);
        Contentcss testContentcss = contentcssList.get(contentcssList.size() - 1);
        assertThat(testContentcss.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testContentcss.getCssurl()).isEqualTo(UPDATED_CSSURL);
    }

    @Test
    @Transactional
    public void updateNonExistingContentcss() throws Exception {
        int databaseSizeBeforeUpdate = contentcssRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContentcssMockMvc.perform(put("/api/contentcsses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentcss)))
            .andExpect(status().isBadRequest());

        // Validate the Contentcss in the database
        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContentcss() throws Exception {
        // Initialize the database
        contentcssRepository.saveAndFlush(contentcss);

        int databaseSizeBeforeDelete = contentcssRepository.findAll().size();

        // Delete the contentcss
        restContentcssMockMvc.perform(delete("/api/contentcsses/{id}", contentcss.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contentcss> contentcssList = contentcssRepository.findAll();
        assertThat(contentcssList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
