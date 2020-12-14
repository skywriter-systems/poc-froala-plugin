package com.innvo.repository;

import com.innvo.domain.Contentcss;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentcssRepository extends JpaRepository<Contentcss, Long> {
}
