package com.ats.repository;

import com.ats.entity.ApplicationStatus;
import com.ats.entity.Job;
import com.ats.entity.JobApplication;
import com.ats.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByCandidate(User candidate);

    List<JobApplication> findByJob(Job job);

    Optional<JobApplication> findByCandidateAndJob(User candidate, Job job);

    long countByStatus(ApplicationStatus status);
}
