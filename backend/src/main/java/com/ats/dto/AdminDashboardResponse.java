package com.ats.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private long totalUsers;
    private long candidates;
    private long recruiters;
    private long admins;
    private long totalJobs;
    private long totalApplications;
    private Map<String, Long> applicationsByStatus;
}
