package com.ats.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;

@Data
public class InterviewRequest {
    @NotNull
    private Long applicationId;

    @NotNull
    private Instant scheduledAt;

    private String notes;
}
