package com.ats.config;

import com.ats.entity.CandidateProfile;
import com.ats.entity.Job;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.CandidateProfileRepository;
import com.ats.repository.JobRepository;
import com.ats.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("!test")
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final JobRepository jobRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedUsers() {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }
            String pwd = passwordEncoder.encode("password123");
            userRepository.save(User.builder()
                    .name("Admin User")
                    .email("admin@ats.local")
                    .password(pwd)
                    .role(Role.ADMIN)
                    .active(true)
                    .build());
            User recruiter = userRepository.save(User.builder()
                    .name("Recruiter One")
                    .email("recruiter@ats.local")
                    .password(pwd)
                    .role(Role.RECRUITER)
                    .active(true)
                    .build());
            User candidate = userRepository.save(User.builder()
                    .name("Candidate One")
                    .email("candidate@ats.local")
                    .password(pwd)
                    .role(Role.CANDIDATE)
                    .active(true)
                    .build());
            candidateProfileRepository.save(CandidateProfile.builder().user(candidate).build());
            jobRepository.save(Job.builder()
                    .title("Senior Software Engineer")
                    .description("Build and ship features for our ATS platform. Experience with Java, React, and REST APIs.")
                    .company("Demo Corp")
                    .location("Remote")
                    .postedBy(recruiter)
                    .build());
            log.info("Seeded demo users: admin@ats.local, recruiter@ats.local, candidate@ats.local (password: password123)");
        };
    }
}
