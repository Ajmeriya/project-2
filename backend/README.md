# Backend

Minimal Spring Boot backend with MySQL connectivity.

## Authentication

Authentication endpoints:

- `POST /api/auth/register` with `{ "fullName": "...", "email": "...", "password": "..." }`
- `POST /api/auth/login` with `{ "email": "...", "password": "..." }`

Both endpoints return a JWT in the `token` field. Send it on protected requests as
`Authorization: Bearer <token>`.

## Requirements

- Java 17 or newer
- Maven 3.9+
- MySQL running locally

## Database configuration

The application reads these environment variables and provides local defaults:

- `DB_URL`: defaults to `jdbc:mysql://localhost:3306/project2?createDatabaseIfNotExist=true&serverTimezone=UTC`
- `DB_USERNAME`: defaults to `root`
- `DB_PASSWORD`: defaults to an empty password
- `JWT_SECRET`: signing secret; set a long random value outside development
- `JWT_EXPIRATION_MS`: token lifetime in milliseconds, defaults to 24 hours

For PowerShell, configure them before starting the app:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your-password"
```

## Run

From this directory:

```powershell
mvn spring-boot:run
```

Build without starting the application:

```powershell
mvn clean package
```
