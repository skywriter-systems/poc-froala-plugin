package com.innvo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Contentcss.
 */
@Entity
@Table(name = "contentcss")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Contentcss implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "cssurl", nullable = false)
    private String cssurl;

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

    public Contentcss name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCssurl() {
        return cssurl;
    }

    public Contentcss cssurl(String cssurl) {
        this.cssurl = cssurl;
        return this;
    }

    public void setCssurl(String cssurl) {
        this.cssurl = cssurl;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contentcss)) {
            return false;
        }
        return id != null && id.equals(((Contentcss) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contentcss{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", cssurl='" + getCssurl() + "'" +
            "}";
    }
}
