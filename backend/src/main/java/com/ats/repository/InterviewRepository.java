package com.ats.repository;

import com.ats.entity.Interview;
import com.ats.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByJobApplication(JobApplication jobApplication);
}
