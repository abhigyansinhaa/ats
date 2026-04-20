package com.ats.service;

import com.ats.dto.InterviewRequest;
import com.ats.dto.InterviewResponse;
import com.ats.entity.ApplicationStatus;
import com.ats.entity.Interview;
import com.ats.entity.InterviewStatus;
import com.ats.entity.JobApplication;
import com.ats.entity.Role;
import com.ats.repository.InterviewRepository;
import com.ats.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;

    @Transactional
    public InterviewResponse schedule(InterviewRequest request, Long recruiterUserId, Role role) {
        JobApplication app = jobApplicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        if (role == Role.RECRUITER && !app.getJob().getPostedBy().getId().equals(recruiterUserId)) {
            throw new IllegalStateException("Not allowed");
        }
        if (role != Role.RECRUITER && role != Role.ADMIN) {
            throw new IllegalStateException("Not allowed");
        }
        Interview interview = Interview.builder()
                .jobApplication(app)
                .scheduledAt(request.getScheduledAt())
                .status(InterviewStatus.SCHEDULED)
                .notes(request.getNotes())
                .build();
        interview = interviewRepository.save(interview);
        app.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
        jobApplicationRepository.save(app);
        return toResponse(interview);
    }

    public List<InterviewResponse> forApplication(Long applicationId, Long recruiterUserId, Role role) {
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        if (role == Role.RECRUITER && !app.getJob().getPostedBy().getId().equals(recruiterUserId)) {
            throw new IllegalStateException("Not allowed");
        }
        return interviewRepository.findByJobApplication(app).stream()
                .map(this::toResponse)
                .toList();
    }

    private InterviewResponse toResponse(Interview i) {
        return InterviewResponse.builder()
                .id(i.getId())
                .applicationId(i.getJobApplication().getId())
                .scheduledAt(i.getScheduledAt())
                .status(i.getStatus())
                .notes(i.getNotes())
                .build();
    }
}
