package com.ats.service;

import com.ats.dto.JobRequest;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.JobRepository;
import com.ats.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class JobServiceTest {

    @Autowired
    JobService jobService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    User recruiter;

    @BeforeEach
    void setup() {
        jobRepository.deleteAll();
        userRepository.deleteAll();
        recruiter = userRepository.save(User.builder()
                .name("R")
                .email("r@x.com")
                .password("x")
                .role(Role.RECRUITER)
                .active(true)
                .build());
    }

    @Test
    void createJob() {
        JobRequest req = new JobRequest();
        req.setTitle("Engineer");
        req.setDescription("Desc");
        req.setCompany("Co");
        req.setLocation("Remote");
        var res = jobService.create(req, recruiter.getId());
        assertThat(res.getTitle()).isEqualTo("Engineer");
        assertThat(res.getPostedById()).isEqualTo(recruiter.getId());
    }
}
