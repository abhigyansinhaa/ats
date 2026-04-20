package com.ats.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CandidateProfileRequest {

    @Size(max = 2000)
    private String skills;

    @Size(max = 2000)
    private String experience;
}
