package com.innvo.repository;

import com.innvo.domain.Contentworkspace;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Contentworkspace entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentworkspaceRepository extends JpaRepository<Contentworkspace, Long> {
}
