package com.ats.controller;

import com.ats.dto.JobRequest;
import com.ats.dto.JobResponse;
import com.ats.security.SecurityUtils;
import com.ats.security.UserPrincipal;
import com.ats.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    @Operation(summary = "List all jobs (public)")
    public ResponseEntity<List<JobResponse>> list() {
        return ResponseEntity.ok(jobService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get job by id (public)")
    public ResponseEntity<JobResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Create job")
    public ResponseEntity<JobResponse> create(@Valid @RequestBody JobRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobService.create(request, u.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Update job")
    public ResponseEntity<JobResponse> update(@PathVariable Long id, @Valid @RequestBody JobRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(jobService.update(id, request, u.getId(), u.getRole()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @Operation(summary = "Delete job")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        UserPrincipal u = SecurityUtils.currentUser();
        jobService.delete(id, u.getId(), u.getRole());
        return ResponseEntity.noContent().build();
    }
}
