# Applicant Tracking System (ATS)

Full-stack ATS with **Spring Boot + MySQL + Spring Data JPA (Hibernate)** backend and **React + Vite + Tailwind** frontend: JWT auth, role-based access (`ADMIN`, `RECRUITER`, `CANDIDATE`), jobs, applications, interviews, and an admin dashboard.

## Prerequisites

- **JDK 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm**
- **MySQL 8** (local or Docker)

## Database

The API uses **MySQL 8** at runtime and **Spring Data JPA** with **Hibernate** for mapping and queries (entities under `backend/src/main/java/com/ats/entity/`, repositories under `com.ats.repository`). The MySQL JDBC driver is used under the hood; you do not configure raw JDBC in application code. Details: [`backend/README.md`](backend/README.md).

### Local MySQL (Docker)

From the repo root:

```bash
docker compose up -d mysql
```

This starts MySQL 8 on port **3306** with database `ats` (see [`docker-compose.yml`](docker-compose.yml)), matching the default URL in [`backend/src/main/resources/application.yml`](backend/src/main/resources/application.yml).

### Manual setup

1. Create a database (or rely on `createDatabaseIfNotExist` in the JDBC URL):

   ```sql
   CREATE DATABASE ats CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Set credentials via environment (same names as in `application.yml`) or edit defaults in `application.yml`:

   - `DB_URL` (default `jdbc:mysql://localhost:3306/ats?...`)
   - `DB_USERNAME` (default `root`)
   - `DB_PASSWORD` (default `root`)
   - `ATS_JWT_SECRET` (optional in dev; use a strong secret in production—signing key is SHA-256 derived)

   Spring Boot also accepts `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` for `spring.datasource.*` if you prefer standard Spring env names.

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

- [`backend/`](backend/) — Spring Boot, Spring Data JPA (Hibernate), MySQL, JWT security, REST controllers
- [`frontend/`](frontend/) — React Router, Axios, Tailwind UI

## License

MIT (or your organization’s default).
