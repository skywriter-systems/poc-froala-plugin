package com.innvo.repository;

import com.innvo.domain.Contentcss;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Contentcss entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentcssRepository extends JpaRepository<Contentcss, Long> {
}
