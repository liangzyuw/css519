# Incident Response Runbook – CoffeeJelly

This runbook documents the process for identifying and responding to security incidents in the CoffeeJelly platform. The current implementation is a mock Dockerized application, but the incident response workflow is designed to reflect realistic operational security practices.

The goal of this runbook is to ensure that suspicious activity, such as unauthorized access attempts against textbook annotations or instructor-only resources, can be detected and handled consistently.

---

## 1. System Components

CoffeeJelly currently consists of the following Dockerized services:

* Frontend textbook platform: `localhost:5173`
* Backend API: `localhost:3000`
* Operational dashboard interface: `localhost:5001`
* Dashboard metrics API: `localhost:4001`

---

## 2. Security-Relevant Metrics

The dashboard displays service health, API activity, latency metrics, usage metrics, login trends, and security-related metrics. These metrics help identify suspicious activity such as repeated failed logins, access attempts without authentication, invalid token usage, and attempts to perform instructor-only actions.

* `unauthorized_requests_count`
* `failed_login_count`
* `rate_limited_requests`
* `api_error_count`
* `api_requests_total`
* `recent_security_events`

---

## 3. Incident Scenario: Unauthorized Annotation Access or Deletion Attempt

If successful, this type of incident could compromise the integrity or confidentiality of educational content. Instructor annotations may contain important teaching guidance, and unauthorized deletion could reduce the quality of student learning support.

An external or unauthorized user attempts to access or delete instructor annotation data. This may include:

* Sending a GET request to retrieve annotations without a valid authentication token| Severity: **Medium**
* Sending a DELETE request to remove an annotation without authentication | Severity: **High**
* Logging in as a student and attempting to perform an instructor-only delete action | Severity: **High**


---

## 4. Detection

### 4.1 Dashboard Indicators

The incident may be detected through the CoffeeJelly dashboard using the following indicators:

* Increase in `unauthorized_requests_count`
* Increase in `api_error_count`
* New entries in `recent_security_events`
* Security event types such as:
  * `UNAUTHORIZED_REQUEST`
  * `INVALID_TOKEN`
  * `FORBIDDEN_INSTRUCTOR_ACTION`
  * `ANNOTATION_DELETED`

### 4.2 Example Detection Pattern

A likely unauthorized access attempt may appear as:

```text
Security Event: UNAUTHORIZED_REQUEST
Method: GET
Path: /api/annotations?content_type=section&content_id=tb1-sec1
Reason: No token provided
```

A likely unauthorized deletion attempt may appear as:

```text
Security Event: UNAUTHORIZED_REQUEST
Method: DELETE
Path: /api/annotations/1
Reason: No token provided
```

A role-based authorization failure may appear as:

```text
Security Event: FORBIDDEN_INSTRUCTOR_ACTION
Method: DELETE
Path: /api/annotations/1
Role: student
Reason: Instructor role required
```

---

## 5. Response Steps

When an alert or suspicious dashboard pattern is observed:

1. Open the CoffeeJelly dashboard at `localhost:5001`.
2. Review the Security section.
3. Check whether `unauthorized_requests_count` or `api_error_count` increased.
4. Review the `recent_security_events` list.
5. Identify the affected endpoint, request method, and event type.
6. Determine whether the request was unauthenticated, invalidly authenticated, or authenticated with insufficient privileges.
7. Check whether any destructive action succeeded, such as annotation deletion.

---

## 6. Containment

For the current mock project, containment actions are limited but should include:

1. Stop the backend container if suspicious activity is ongoing:
2. Confirm that protected endpoints are requiring authentication.
3. Confirm that instructor-only endpoints require the instructor role.

```bash
docker-compose stop backend
```

4. If needed, restart all services:

```bash
docker-compose down
docker-compose up --build
```

5. If a token is suspected to be compromised, rotate the development JWT secret and restart the backend.

---

## 7. Eradication

After containment:

1. Review the vulnerable endpoint, and if they're recorded in dashboard metrics.
2. Confirm that `authMiddleware` is applied and that instructor-only actions use role-based middleware.
4. Confirm that unauthorized attempts return `401 Unauthorized`.
5. Confirm that forbidden role-based attempts return `403 Forbidden`.

---

## 8. Recovery

After the issue is corrected, restart the Docker environment:

```bash
docker-compose down
docker-compose up --build
```

1. Re-test valid student access.
2. Re-test valid instructor access.
3. Re-run the simulated unauthorized requests.
4. Check CI/CD Pipeline
5. Confirm that unauthorized requests are blocked and visible on the dashboard.
6. Confirm that legitimate annotation viewing still works for authenticated users.

---

## 9. Validation Tests

### Test 1: External User Attempts to Read Annotations

```bash
curl -i "http://localhost:3000/api/annotations?content_type=section&content_id=tb1-sec1"
```

Expected result:

```text
401 Unauthorized
```

Expected dashboard result:

```text
unauthorized_requests_count increases
recent_security_events includes UNAUTHORIZED_REQUEST
```

### Test 2: External User Attempts to Delete Annotation

```bash
curl -i -X DELETE "http://localhost:3000/api/annotations/1"
```

Expected result:

```text
401 Unauthorized
```

Expected dashboard result:

```text
unauthorized_requests_count increases
recent_security_events includes UNAUTHORIZED_REQUEST
```

### Test 3: Student Attempts Instructor-Only Delete

Expected result:

```text
403 Forbidden
```

Expected dashboard result:

```text
unauthorized_requests_count increases
recent_security_events includes FORBIDDEN_INSTRUCTOR_ACTION
```

---

## 10. Review

After the incident simulation or real incident is resolved, document:

* Date and time of detection
* Endpoint targeted
* Request method used
* Whether the request was unauthenticated or unauthorized
* Dashboard metrics that changed
* Whether the attack succeeded or was blocked
* What controls prevented the attack

---

This simulated incident demonstrates the value of authentication, authorization, and operational monitoring. Instructor annotations represent important instructional content that should not be accessed or modified by unauthorized users. The dashboard provides an early alert mechanism by exposing unauthorized request counts and recent security events. In a production version, these events should be sent to a persistent logging system and integrated with alerting tools.
