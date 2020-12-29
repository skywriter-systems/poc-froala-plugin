package com.innvo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Contentworkspace.
 */
@Entity
@Table(name = "contentworkspace")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Contentworkspace implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties(value = "contentpages", allowSetters = true)
    private Contentcss contentcss;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Contentworkspace name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Contentcss getContentcss() {
        return contentcss;
    }

    public Contentworkspace contentcss(Contentcss contentcss) {
        this.contentcss = contentcss;
        return this;
    }

    public void setContentcss(Contentcss contentcss) {
        this.contentcss = contentcss;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contentworkspace)) {
            return false;
        }
        return id != null && id.equals(((Contentworkspace) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contentworkspace{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
