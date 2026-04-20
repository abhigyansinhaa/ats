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

import java.util.List;

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

            List<Job> demoJobs = List.of(
                    Job.builder()
                            .title("Senior Software Engineer")
                            .description("Build and ship features for our ATS platform. Experience with Java, React, and REST APIs.")
                            .company("Demo Corp")
                            .location("Remote")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Frontend Developer (React)")
                            .description("Implement responsive UIs with React and TypeScript. Collaborate with design on component libraries.")
                            .company("Demo Corp")
                            .location("Hybrid — Austin, TX")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Backend Engineer — Java")
                            .description("Design REST services, work with Spring Boot and MySQL, and help shape API contracts.")
                            .company("Demo Corp")
                            .location("Remote — US")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("DevOps Engineer")
                            .description("Maintain CI/CD, Kubernetes clusters, and observability. Experience with GitHub Actions and Terraform.")
                            .company("Northwind Labs")
                            .location("Seattle, WA")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Product Designer")
                            .description("Own end-to-end design for hiring workflows. Strong Figma skills and systems thinking.")
                            .company("Northwind Labs")
                            .location("Remote")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Technical Recruiter")
                            .description("Source and close engineering talent. Partner with hiring managers on role specs and pipelines.")
                            .company("Acme Talent")
                            .location("Chicago, IL")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Data Analyst")
                            .description("Build dashboards and ad-hoc analyses. SQL required; Python and BI tools a plus.")
                            .company("Acme Talent")
                            .location("Remote")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Mobile Engineer (iOS)")
                            .description("Ship native iOS features in Swift. Experience with SwiftUI and app store releases.")
                            .company("Pixel Mobile")
                            .location("New York, NY")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("QA Automation Engineer")
                            .description("Design and maintain automated test suites. Selenium, Playwright, or Cypress experience.")
                            .company("Pixel Mobile")
                            .location("Remote")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Security Engineer")
                            .description("Threat modeling, secure SDLC, and incident response coordination with platform teams.")
                            .company("Shield Security Co")
                            .location("Washington, DC")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Engineering Manager")
                            .description("Lead a team of 6–8 engineers. Balance delivery, mentorship, and cross-functional partnership.")
                            .company("Shield Security Co")
                            .location("Hybrid — Boston, MA")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Site Reliability Engineer")
                            .description("On-call rotation, SLOs, and incident tooling. Strong Linux and networking fundamentals.")
                            .company("CloudScale Inc")
                            .location("Remote — EU")
                            .postedBy(recruiter)
                            .build(),
                    Job.builder()
                            .title("Full-Stack Engineer")
                            .description("Work across React and Spring Boot. Own features from database to UI for internal tools.")
                            .company("CloudScale Inc")
                            .location("Denver, CO")
                            .postedBy(recruiter)
                            .build());
            jobRepository.saveAll(demoJobs);
            log.info("Seeded demo users: admin@ats.local, recruiter@ats.local, candidate@ats.local (password: password123)");
        };
    }
}
