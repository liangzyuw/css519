# CI/CD Current and future guidelines for full development

## 5.3.2026 CI/CD Status

As of now, the project contains the foundation for a basic CI pipeline. The application can be built with Docker Compose, and automated shell-based API tests can be run against the backend service. These tests currently cover basic authentication behavior, authorization checks, and annotation creation behavior. 

`backend/tests/security_tests.sh`  
`backend/tests/functional_tests.sh`

The project also includes backend Jest/Supertest tests for authentication behavior. These tests exercise the backend application through Express routes without requiring the full Docker Compose stack.  

Currently, the current setup represents a basic **Continuous Integration (CI)** pipeline rather than a production-level **Continuous Integration / Continuous Delivery (CI/CD)** pipeline.

## Gaps in Continuous Integration

### Limited Unit Test Coverage
These tests primarily check through HTTP requests using shell scripts and `curl`, which are useful integration and security tests but do not fully replace unit tests for the application, but they do validate behavior against a running backend.  

The backend also includes Jest/Supertest tests for authentication behavior. These tests are closer to backend integration tests because they exercise Express routes and middleware, rather than isolate individual functions or modules.

**Current gap:**
- Needs more broad unit test coverage for route handlers, middleware, or validation logic.
- Limited frontend test coverage.
- Limited negative test coverage for invalid annotation payloads, malformed tokens, and role-based access control.

**Future Development:**
- Add more Jest/Supertest tests for backend APIs.
- Add unit tests for middleware such as authentication and role-based authorization.
- Add frontend component tests for login and textbook rendering behavior.
- Maybe add tests for dashboard metrics rendering and failure states.

## Security Scanning and Dependency Checks
The current test scripts check some application-level security cases, but the pipeline does not scan dependencies or container images for known vulnerabilities.

**Future Development:**
- Add `npm audit` or dependency vulnerability scanning.
- Add container scanning with tools such as Trivy.
- Add static analysis or linting for JavaScript/TypeScript code.
- Enable automated secret scanning beyond GitHub's default repository protections.

## Gaps in Continuous Delivery / Deployment 

### No Automated Deployment Target
The current system can be built and run locally using Docker Compose, but there is no remote deployment environment.

**Future Development:**
- Needs staging server, production server, or cloud development target
- Use environment-specific configuration for local, staging, and production environments.
- CI verifies builds/tests but does not publish or deploy containers/successful builds. 
- It should still require manual approval before production deployment.
- Push Docker images to a container registry.
- Define rollback procedures for failed deployments.

## Summary of Next Steps

Possible next steps toward full CI/CD:

1. Expand the existing GitHub Actions workflow to run more backend, frontend, and dashboard tests.
2. Add pure Jest unit tests for backend helper functions, middleware, and validation logic. Additionally add Jest/Supertest integration tests for backend APIs.
3. Add frontend component tests for login and textbook rendering behavior.
4. Add Docker health checks and `/health` endpoints.
5. Replace hardcoded dashboard metrics with real backend-emitted metrics.
6. Push Docker images to a container registry.
7. Add a staging deployment target.
8. Add branch protection requiring CI to pass before merge.
9. Add dependency, container, and secret scanning.
10. Define rollback and release versioning procedures.

Overall, as of now, the project includes Jest/Supertest backend API tests and shell-based integration/security tests. Future work includes adding more isolated unit tests for middleware, validation, and helper logic.