# ATS Backend

Spring Boot 3 API using **MySQL 8** as the runtime database and **Spring Data JPA** (Hibernate) for persistence.

## Persistence model

| Layer | Location | Role |
|--------|----------|------|
| Entities / schema | `src/main/java/com/ats/entity/` | JPA `@Entity` mappings; tables are created/updated per `spring.jpa.hibernate.ddl-auto` in `application.yml`. |
| Data access | `src/main/java/com/ats/repository/` | `JpaRepository` interfaces; no hand-written JDBC in application code. |
| JDBC driver | `mysql-connector-j` (runtime) | Used by Hibernate to connect to MySQL. |

Tests use **H2** in-memory with MySQL compatibility mode (`application-test.yml`), not MySQL.

See the root [`README.md`](../README.md) for env vars, Docker MySQL, and how to run the app.
