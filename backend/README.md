# Backend

Minimal Spring Boot backend with MySQL connectivity.

## Authentication

Authentication endpoints:

- `POST /api/auth/register` with `{ "fullName": "...", "email": "...", "password": "..." }`
- `POST /api/auth/login` with `{ "email": "...", "password": "..." }`

Both endpoints return a JWT in the `token` field. Send it on protected requests as
`Authorization: Bearer <token>`.

Authenticated template endpoints:

- `GET /api/templates`
- `GET /api/templates/{id}`
- `POST /api/templates`
- `PUT /api/templates/{id}`
- `DELETE /api/templates/{id}`
- `POST /api/templates/{id}/detect`
- `PUT /api/templates/{id}/verify`
- `POST /api/templates/{id}/ready`
- `GET /api/templates/{id}/file`

Template creation uses multipart form data with `metadata` JSON and `file`; the empty form is stored in MySQL. Template `fields` are stored as a JSON string using the editor field shape.

Authenticated document endpoints:

- `GET /api/documents`
- `GET /api/documents/{id}`
- `POST /api/documents` as multipart form data with `metadata` JSON and `file`
- `DELETE /api/documents/{id}`
- `GET /api/documents/{id}/file`
- `POST /api/documents/{id}/align`
- `POST /api/documents/{id}/extract`
- `POST /api/documents/{id}/verify`
- `POST /api/documents/{id}/finalize`

Uploads store document metadata and file bytes in MySQL. OCR is not included yet.

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
