package com.ats.dto;

import com.ats.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    /**
     * Optional — self-registration supports CANDIDATE and RECRUITER only.
     * Defaults to CANDIDATE when omitted. ADMIN is never allowed via this endpoint.
     */
    private Role role;
}
