# Applicant Tracking System (ATS)

Full-stack ATS with **Spring Boot + MySQL** backend and **React + Vite + Tailwind** frontend: JWT auth, role-based access (`ADMIN`, `RECRUITER`, `CANDIDATE`), jobs, applications, interviews, and an admin dashboard.

## Prerequisites

- **JDK 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm**
- **MySQL 8** (local or Docker)

## Database

1. Create a database (or rely on `createDatabaseIfNotExist` in the JDBC URL):

   ```sql
   CREATE DATABASE ats CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Set credentials in [`backend/src/main/resources/application.yml`](backend/src/main/resources/application.yml) or override with env:

   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `ATS_JWT_SECRET` (optional; any string—signing key is SHA-256 derived)

## Backend

```bash
cd backend
mvn spring-boot:run
```

- API base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

### Demo users (seeded on first run)

| Email               | Password     | Role       |
|---------------------|--------------|------------|
| `admin@ats.local`   | `password123`| ADMIN      |
| `recruiter@ats.local` | `password123` | RECRUITER |
| `candidate@ats.local` | `password123` | CANDIDATE |

A sample job is created for the demo recruiter.

### Tests

```bash
cd backend
mvn test
```

Uses H2 in-memory with profile `test` (see [`backend/src/test/resources/application-test.yml`](backend/src/test/resources/application-test.yml)).

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The dev server proxies `/api` to `http://localhost:8080`.

## Main API (overview)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register as **candidate** |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/jobs` | List jobs (public) |
| GET/POST/PUT/DELETE | `/api/jobs/...` | Recruiter/Admin job CRUD |
| POST | `/api/applications` | Candidate apply |
| GET | `/api/applications/me` | Candidate’s applications |
| GET | `/api/applications/job/{jobId}` | Applicants for a job |
| PUT | `/api/applications/{id}/status` | Update status |
| GET/PUT | `/api/candidate/profile` | Candidate profile |
| POST | `/api/candidate/resume` | Upload resume (multipart `file`) |
| POST/GET | `/api/interviews` | Schedule / list interviews |
| GET | `/api/admin/dashboard` | Admin metrics |
| POST | `/api/admin/users` | Admin creates users (any role) |

## Project layout

- [`backend/`](backend/) — Spring Boot, JPA entities, JWT security, REST controllers
- [`frontend/`](frontend/) — React Router, Axios, Tailwind UI

## License

MIT (or your organization’s default).
