package com.innvo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "contentcss")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Contentcss implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    private String cssname;

    private String csspath;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contentpage_id", nullable = true)
    private Contentpage contentpage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCssname() {
        return cssname;
    }

    public void setCssname(String cssname) {
        this.cssname = cssname;
    }

    public String getCsspath() {
        return csspath;
    }

    public void setCsspath(String csspath) {
        this.csspath = csspath;
    }
    
    public Contentpage getContentpage() {
        return contentpage;
    }

    public void setContentpage(Contentpage contentpage) {
        this.contentpage = contentpage;
    }
}
