package com.innvo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.innvo.web.rest.TestUtil;

public class ContentcssTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contentcss.class);
        Contentcss contentcss1 = new Contentcss();
        contentcss1.setId(1L);
        Contentcss contentcss2 = new Contentcss();
        contentcss2.setId(contentcss1.getId());
        assertThat(contentcss1).isEqualTo(contentcss2);
        contentcss2.setId(2L);
        assertThat(contentcss1).isNotEqualTo(contentcss2);
        contentcss1.setId(null);
        assertThat(contentcss1).isNotEqualTo(contentcss2);
    }
}
