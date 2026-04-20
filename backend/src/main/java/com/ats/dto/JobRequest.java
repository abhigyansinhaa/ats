package com.ats.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JobRequest {

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    @Size(max = 8000)
    private String description;

    @NotBlank
    @Size(max = 200)
    private String company;

    @NotBlank
    @Size(max = 200)
    private String location;
}
