package com.ats.controller;

import com.ats.dto.CandidateProfileRequest;
import com.ats.dto.CandidateProfileResponse;
import com.ats.security.SecurityUtils;
import com.ats.security.UserPrincipal;
import com.ats.service.CandidateProfileService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateProfileService candidateProfileService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Get my profile")
    public ResponseEntity<CandidateProfileResponse> getProfile() {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(candidateProfileService.getProfile(u.getId()));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Update my profile")
    public ResponseEntity<CandidateProfileResponse> updateProfile(@Valid @RequestBody CandidateProfileRequest request) {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(candidateProfileService.updateProfile(u.getId(), request));
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Upload resume file")
    public ResponseEntity<CandidateProfileResponse> uploadResume(@RequestPart("file") MultipartFile file)
            throws IOException {
        UserPrincipal u = SecurityUtils.currentUser();
        return ResponseEntity.ok(candidateProfileService.uploadResume(u.getId(), file));
    }
}
