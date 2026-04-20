package com.ats.controller;

import com.ats.dto.ApplicationRequest;
import com.ats.dto.ApplicationResponse;
import com.ats.dto.ApplicationStatusUpdateRequest;
import com.ats.security.SecurityUtils;
import com.ats.security.UserPrincipal;
import com.ats.service.JobApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Apply to a job")
    public ResponseEntity<ApplicationResponse> apply(@Valid @RequestBody ApplicationRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobApplicationService.apply(request, u.getId()));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "My applications")
    public ResponseEntity<List<ApplicationResponse>> myApplications() {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobApplicationService.myApplications(u.getId()));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Applicants for a job (recruiter owner or admin)")
    public ResponseEntity<List<ApplicationResponse>> forJob(@PathVariable Long jobId) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobApplicationService.applicationsForJob(jobId, u.getId(), u.getRole()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Update application status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationStatusUpdateRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobApplicationService.updateStatus(id, request, u.getId(), u.getRole()));
    }
}
