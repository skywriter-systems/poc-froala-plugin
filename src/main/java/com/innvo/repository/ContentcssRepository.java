package com.innvo.repository;

import com.innvo.domain.Contentcss;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentcssRepository extends JpaRepository<Contentcss, Long> {

    Contentcss findByCsspath(String path);
    
    @Modifying
	@Transactional
	@Query(value = "delete from contentcss where contentpage_id = ?1" , nativeQuery = true)
    void deleteByContentPageId(Long contentPageId);
}
