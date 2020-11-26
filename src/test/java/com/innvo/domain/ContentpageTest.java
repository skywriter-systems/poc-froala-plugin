package com.innvo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.innvo.web.rest.TestUtil;

public class ContentpageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contentpage.class);
        Contentpage contentpage1 = new Contentpage();
        contentpage1.setId(1L);
        Contentpage contentpage2 = new Contentpage();
        contentpage2.setId(contentpage1.getId());
        assertThat(contentpage1).isEqualTo(contentpage2);
        contentpage2.setId(2L);
        assertThat(contentpage1).isNotEqualTo(contentpage2);
        contentpage1.setId(null);
        assertThat(contentpage1).isNotEqualTo(contentpage2);
    }
}
