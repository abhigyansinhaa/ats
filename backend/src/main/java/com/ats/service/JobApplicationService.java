package com.ats.service;

import com.ats.dto.ApplicationRequest;
import com.ats.dto.ApplicationResponse;
import com.ats.dto.ApplicationStatusUpdateRequest;
import com.ats.entity.ApplicationStatus;
import com.ats.entity.Job;
import com.ats.entity.JobApplication;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.JobApplicationRepository;
import com.ats.repository.JobRepository;
import com.ats.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationResponse apply(ApplicationRequest request, Long candidateUserId) {
        User candidate = userRepository.findById(candidateUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (candidate.getRole() != Role.CANDIDATE) {
            throw new IllegalStateException("Only candidates can apply");
        }
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        if (jobApplicationRepository.findByCandidateAndJob(candidate, job).isPresent()) {
            throw new IllegalStateException("Already applied to this job");
        }
        JobApplication app = JobApplication.builder()
                .candidate(candidate)
                .job(job)
                .status(ApplicationStatus.SUBMITTED)
                .build();
        app = jobApplicationRepository.save(app);
        return toResponse(app);
    }

    public List<ApplicationResponse> myApplications(Long candidateUserId) {
        User candidate = userRepository.findById(candidateUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return jobApplicationRepository.findByCandidate(candidate).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ApplicationResponse> applicationsForJob(Long jobId, Long recruiterUserId, Role actorRole) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        if (actorRole != Role.ADMIN && !job.getPostedBy().getId().equals(recruiterUserId)) {
            throw new IllegalStateException("Not allowed to view applicants for this job");
        }
        return jobApplicationRepository.findByJob(job).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse updateStatus(Long applicationId, ApplicationStatusUpdateRequest req,
                                            Long actorUserId, Role actorRole) {
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        if (actorRole == Role.RECRUITER) {
            if (!app.getJob().getPostedBy().getId().equals(actorUserId)) {
                throw new IllegalStateException("Not allowed");
            }
        } else if (actorRole != Role.ADMIN) {
            throw new IllegalStateException("Not allowed");
        }
        app.setStatus(req.getStatus());
        if (req.getStatus() == ApplicationStatus.INTERVIEW_SCHEDULED) {
            // optional: ensure interview exists elsewhere
        }
        app = jobApplicationRepository.save(app);
        return toResponse(app);
    }

    private ApplicationResponse toResponse(JobApplication app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .company(app.getJob().getCompany())
                .status(app.getStatus())
                .appliedAt(app.getAppliedAt())
                .candidateId(app.getCandidate().getId())
                .candidateName(app.getCandidate().getName())
                .candidateEmail(app.getCandidate().getEmail())
                .build();
    }
}
