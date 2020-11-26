package com.innvo.web.rest;

import com.innvo.FroalaApp;
import com.innvo.domain.Contentpage;
import com.innvo.repository.ContentpageRepository;

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
 * Integration tests for the {@link ContentpageResource} REST controller.
 */
@SpringBootTest(classes = FroalaApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ContentpageResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENTHTML = "AAAAAAAAAA";
    private static final String UPDATED_CONTENTHTML = "BBBBBBBBBB";

    @Autowired
    private ContentpageRepository contentpageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContentpageMockMvc;

    private Contentpage contentpage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentpage createEntity(EntityManager em) {
        Contentpage contentpage = new Contentpage()
            .title(DEFAULT_TITLE)
            .contenthtml(DEFAULT_CONTENTHTML);
        return contentpage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contentpage createUpdatedEntity(EntityManager em) {
        Contentpage contentpage = new Contentpage()
            .title(UPDATED_TITLE)
            .contenthtml(UPDATED_CONTENTHTML);
        return contentpage;
    }

    @BeforeEach
    public void initTest() {
        contentpage = createEntity(em);
    }

    @Test
    @Transactional
    public void createContentpage() throws Exception {
        int databaseSizeBeforeCreate = contentpageRepository.findAll().size();
        // Create the Contentpage
        restContentpageMockMvc.perform(post("/api/contentpages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentpage)))
            .andExpect(status().isCreated());

        // Validate the Contentpage in the database
        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeCreate + 1);
        Contentpage testContentpage = contentpageList.get(contentpageList.size() - 1);
        assertThat(testContentpage.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContentpage.getContenthtml()).isEqualTo(DEFAULT_CONTENTHTML);
    }

    @Test
    @Transactional
    public void createContentpageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contentpageRepository.findAll().size();

        // Create the Contentpage with an existing ID
        contentpage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContentpageMockMvc.perform(post("/api/contentpages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentpage)))
            .andExpect(status().isBadRequest());

        // Validate the Contentpage in the database
        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentpageRepository.findAll().size();
        // set the field null
        contentpage.setTitle(null);

        // Create the Contentpage, which fails.


        restContentpageMockMvc.perform(post("/api/contentpages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentpage)))
            .andExpect(status().isBadRequest());

        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContentpages() throws Exception {
        // Initialize the database
        contentpageRepository.saveAndFlush(contentpage);

        // Get all the contentpageList
        restContentpageMockMvc.perform(get("/api/contentpages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contentpage.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].contenthtml").value(hasItem(DEFAULT_CONTENTHTML)));
    }
    
    @Test
    @Transactional
    public void getContentpage() throws Exception {
        // Initialize the database
        contentpageRepository.saveAndFlush(contentpage);

        // Get the contentpage
        restContentpageMockMvc.perform(get("/api/contentpages/{id}", contentpage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contentpage.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.contenthtml").value(DEFAULT_CONTENTHTML));
    }
    @Test
    @Transactional
    public void getNonExistingContentpage() throws Exception {
        // Get the contentpage
        restContentpageMockMvc.perform(get("/api/contentpages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContentpage() throws Exception {
        // Initialize the database
        contentpageRepository.saveAndFlush(contentpage);

        int databaseSizeBeforeUpdate = contentpageRepository.findAll().size();

        // Update the contentpage
        Contentpage updatedContentpage = contentpageRepository.findById(contentpage.getId()).get();
        // Disconnect from session so that the updates on updatedContentpage are not directly saved in db
        em.detach(updatedContentpage);
        updatedContentpage
            .title(UPDATED_TITLE)
            .contenthtml(UPDATED_CONTENTHTML);

        restContentpageMockMvc.perform(put("/api/contentpages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedContentpage)))
            .andExpect(status().isOk());

        // Validate the Contentpage in the database
        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeUpdate);
        Contentpage testContentpage = contentpageList.get(contentpageList.size() - 1);
        assertThat(testContentpage.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContentpage.getContenthtml()).isEqualTo(UPDATED_CONTENTHTML);
    }

    @Test
    @Transactional
    public void updateNonExistingContentpage() throws Exception {
        int databaseSizeBeforeUpdate = contentpageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContentpageMockMvc.perform(put("/api/contentpages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(contentpage)))
            .andExpect(status().isBadRequest());

        // Validate the Contentpage in the database
        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContentpage() throws Exception {
        // Initialize the database
        contentpageRepository.saveAndFlush(contentpage);

        int databaseSizeBeforeDelete = contentpageRepository.findAll().size();

        // Delete the contentpage
        restContentpageMockMvc.perform(delete("/api/contentpages/{id}", contentpage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contentpage> contentpageList = contentpageRepository.findAll();
        assertThat(contentpageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
