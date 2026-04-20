package com.ats.service;

import com.ats.dto.AdminDashboardResponse;
import com.ats.dto.AuthResponse;
import com.ats.dto.CreateUserRequest;
import com.ats.entity.CandidateProfile;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.CandidateProfileRepository;
import com.ats.repository.JobApplicationRepository;
import com.ats.repository.JobRepository;
import com.ats.repository.UserRepository;
import com.ats.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminDashboardResponse dashboard() {
        long candidates = userRepository.countByRole(Role.CANDIDATE);
        long recruiters = userRepository.countByRole(Role.RECRUITER);
        long admins = userRepository.countByRole(Role.ADMIN);
        Map<String, Long> byStatus = new HashMap<>();
        for (var s : com.ats.entity.ApplicationStatus.values()) {
            byStatus.put(s.name(), jobApplicationRepository.countByStatus(s));
        }
        return AdminDashboardResponse.builder()
                .totalUsers(userRepository.count())
                .candidates(candidates)
                .recruiters(recruiters)
                .admins(admins)
                .totalJobs(jobRepository.count())
                .totalApplications(jobApplicationRepository.count())
                .applicationsByStatus(byStatus)
                .build();
    }

    @Transactional
    public AuthResponse createUser(CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .active(true)
                .build();
        user = userRepository.save(user);
        if (user.getRole() == Role.CANDIDATE) {
            candidateProfileRepository.save(CandidateProfile.builder().user(user).build());
        }
        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }
}
