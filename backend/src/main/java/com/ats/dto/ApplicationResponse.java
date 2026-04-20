package com.ats.dto;

import com.ats.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private ApplicationStatus status;
    private Instant appliedAt;
    private Long candidateId;
    private String candidateName;
    private String candidateEmail;
}
