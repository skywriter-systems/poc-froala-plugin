package com.innvo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.innvo.web.rest.TestUtil;

public class ContentworkspaceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contentworkspace.class);
        Contentworkspace contentworkspace1 = new Contentworkspace();
        contentworkspace1.setId(1L);
        Contentworkspace contentworkspace2 = new Contentworkspace();
        contentworkspace2.setId(contentworkspace1.getId());
        assertThat(contentworkspace1).isEqualTo(contentworkspace2);
        contentworkspace2.setId(2L);
        assertThat(contentworkspace1).isNotEqualTo(contentworkspace2);
        contentworkspace1.setId(null);
        assertThat(contentworkspace1).isNotEqualTo(contentworkspace2);
    }
}
