package com.innvo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Contentpage.
 */
@Entity
@Table(name = "contentpage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Contentpage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "contenthtml")
    private String contenthtml;

    @ManyToOne
    @JsonIgnoreProperties(value = "contentpagechildren", allowSetters = true)
    private Contentpage contentpageparent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Contentpage title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContenthtml() {
        return contenthtml;
    }

    public Contentpage contenthtml(String contenthtml) {
        this.contenthtml = contenthtml;
        return this;
    }

    public void setContenthtml(String contenthtml) {
        this.contenthtml = contenthtml;
    }

    public Contentpage getContentpageparent() {
        return contentpageparent;
    }

    public Contentpage contentpageparent(Contentpage contentpage) {
        this.contentpageparent = contentpage;
        return this;
    }

    public void setContentpageparent(Contentpage contentpage) {
        this.contentpageparent = contentpage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contentpage)) {
            return false;
        }
        return id != null && id.equals(((Contentpage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contentpage{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", contenthtml='" + getContenthtml() + "'" +
            "}";
    }
}
