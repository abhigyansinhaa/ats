package com.ats.service;

import com.ats.dto.JobRequest;
import com.ats.dto.JobResponse;
import com.ats.entity.Job;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.JobRepository;
import com.ats.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public List<JobResponse> findAll() {
        return jobRepository.findAll().stream().map(this::toResponse).toList();
    }

    public JobResponse findById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        return toResponse(job);
    }

    @Transactional
    public JobResponse create(JobRequest request, Long recruiterUserId) {
        User recruiter = userRepository.findById(recruiterUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .company(request.getCompany())
                .location(request.getLocation())
                .postedBy(recruiter)
                .build();
        job = jobRepository.save(job);
        return toResponse(job);
    }

    @Transactional
    public JobResponse update(Long id, JobRequest request, Long recruiterUserId, Role actorRole) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        if (actorRole != Role.ADMIN && !job.getPostedBy().getId().equals(recruiterUserId)) {
            throw new IllegalStateException("Not allowed to edit this job");
        }
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job = jobRepository.save(job);
        return toResponse(job);
    }

    @Transactional
    public void delete(Long id, Long recruiterUserId, Role actorRole) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        if (actorRole != Role.ADMIN && !job.getPostedBy().getId().equals(recruiterUserId)) {
            throw new IllegalStateException("Not allowed to delete this job");
        }
        jobRepository.delete(job);
    }

    private JobResponse toResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .company(job.getCompany())
                .location(job.getLocation())
                .postedById(job.getPostedBy().getId())
                .postedByName(job.getPostedBy().getName())
                .createdAt(job.getCreatedAt())
                .build();
    }
}
