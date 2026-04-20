package com.ats.controller;

import com.ats.dto.InterviewRequest;
import com.ats.dto.InterviewResponse;
import com.ats.security.SecurityUtils;
import com.ats.security.UserPrincipal;
import com.ats.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Schedule interview")
    public ResponseEntity<InterviewResponse> schedule(@Valid @RequestBody InterviewRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(interviewService.schedule(request, u.getId(), u.getRole()));
    }

    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "List interviews for application")
    public ResponseEntity<List<InterviewResponse>> listForApplication(@PathVariable Long applicationId) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(interviewService.forApplication(applicationId, u.getId(), u.getRole()));
    }
}
