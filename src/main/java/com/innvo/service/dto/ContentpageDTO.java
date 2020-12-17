package com.innvo.service.dto;

import javax.validation.constraints.NotNull;
import java.util.Set;

public class ContentpageDTO {

    private Long id;
    @NotNull
    private String title;
    private String contenthtml;
    private String contenthtmllink;
    private Set<String> contentcss;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContenthtml() {
        return contenthtml;
    }

    public void setContenthtml(String contenthtml) {
        this.contenthtml = contenthtml;
    }

    public String getContenthtmllink() {
        return contenthtmllink;
    }

    public void setContenthtmllink(String contenthtmllink) {
        this.contenthtmllink = contenthtmllink;
    }

    public Set<String> getContentcss() {
        return contentcss;
    }

    public void setContentcss(Set<String> contentcss) {
        this.contentcss = contentcss;
    }

    @Override
    public String toString() {
        return "ContentpageDTO{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", contenthtml='" + contenthtml + '\'' +
            ", contenthtmllink='" + contenthtmllink + '\'' +
            ", contentcss=" + contentcss +
            '}';
    }
}
