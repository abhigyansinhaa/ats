package com.ats.service;

import com.ats.dto.CandidateProfileRequest;
import com.ats.dto.CandidateProfileResponse;
import com.ats.entity.CandidateProfile;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.CandidateProfileRepository;
import com.ats.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;
    private final String uploadDir;

    public CandidateProfileService(
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository,
            @Value("${ats.upload-dir}") String uploadDir) {
        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
        this.uploadDir = uploadDir;
    }

    public CandidateProfileResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getRole() != Role.CANDIDATE) {
            throw new IllegalStateException("Not a candidate");
        }
        CandidateProfile profile = candidateProfileRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Profile missing"));
        return toResponse(profile);
    }

    @Transactional
    public CandidateProfileResponse updateProfile(Long userId, CandidateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getRole() != Role.CANDIDATE) {
            throw new IllegalStateException("Not a candidate");
        }
        CandidateProfile profile = candidateProfileRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Profile missing"));
        profile.setSkills(request.getSkills());
        profile.setExperience(request.getExperience());
        profile = candidateProfileRepository.save(profile);
        return toResponse(profile);
    }

    @Transactional
    public CandidateProfileResponse uploadResume(Long userId, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File required");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (user.getRole() != Role.CANDIDATE) {
            throw new IllegalStateException("Not a candidate");
        }
        String original = file.getOriginalFilename();
        String ext = original != null && original.contains(".")
                ? original.substring(original.lastIndexOf('.'))
                : "";
        String stored = UUID.randomUUID() + ext;
        Path dir = Paths.get(uploadDir);
        Files.createDirectories(dir);
        Path target = dir.resolve(stored);
        Files.copy(file.getInputStream(), target);

        CandidateProfile profile = candidateProfileRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Profile missing"));
        profile.setResumeFileName(stored);
        profile = candidateProfileRepository.save(profile);
        return toResponse(profile);
    }

    private CandidateProfileResponse toResponse(CandidateProfile p) {
        return CandidateProfileResponse.builder()
                .id(p.getId())
                .userId(p.getUser().getId())
                .skills(p.getSkills())
                .experience(p.getExperience())
                .resumeFileName(p.getResumeFileName())
                .build();
    }
}
