package com.ats.controller;

import com.ats.dto.LoginRequest;
import com.ats.dto.RegisterRequest;
import com.ats.entity.Role;
import com.ats.entity.User;
import com.ats.repository.CandidateProfileRepository;
import com.ats.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CandidateProfileRepository candidateProfileRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @BeforeEach
    void clean() {
        candidateProfileRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void register_returnsToken() throws Exception {
        RegisterRequest req = new RegisterRequest();
        req.setName("Test User");
        req.setEmail("test@example.com");
        req.setPassword("secret12");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.role").value("CANDIDATE"));
    }

    @Test
    void login_withSeededStyleUser() throws Exception {
        User u = userRepository.save(User.builder()
                .name("U")
                .email("u@x.com")
                .password(passwordEncoder.encode("pass12345"))
                .role(Role.CANDIDATE)
                .active(true)
                .build());
        candidateProfileRepository.save(com.ats.entity.CandidateProfile.builder().user(u).build());

        LoginRequest login = new LoginRequest();
        login.setEmail("u@x.com");
        login.setPassword("pass12345");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }
}
