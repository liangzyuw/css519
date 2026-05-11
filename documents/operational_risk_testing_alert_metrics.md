## Automated Operational Risk Tests - Date: May 10th, 2026

This document lists automated tests in the CI/CD pipeline to detect problems related to operational risks.

### Test 1: Metrics Endpoint Availability

- **Risk Covered:** Operators may be unable to determine the health of the Product.
- **Test:** `GET /metrics` must return service health, API metrics, latency metrics, and annotation count.
- **Expected Result:** The endpoint returns HTTP 200 and includes required operational fields.

### Test 2: Annotation Count Accuracy

- **Risk Covered:** The OE dashboard may display stale or incorrect annotation totals.
- **Test:** Create an annotation using `POST /api/annotations`, then verify that `GET /metrics` reports the updated `annotations_total`.
- **Expected Result:** `annotations_total` increases after annotation creation.

### Test 3: Annotation Load Time Recording

- **Risk Covered:** The system may fail to track student-facing annotation latency.
- **Test:** Submit a client metric to `POST /metrics/client`, then verify that `GET /metrics` returns the recorded value.
- **Expected Result:** `annotation_load_time_ms` reflects the reported client-side timing.

## Unautomated Manual Tests

### Textbook Load Time
- **Risk to address:** Measuring how long it takes for the textbook viewer to display content on request for chapter sections.
- **Implementation:** Currently, the textbook viewer still needs a lot of features to divide sections and chapters within textbook content, and this will be thoroughly tested when future development comes around.

### Unauthorized Logins
- **Risk to address:** Ensure unauthenticated users cannot disrupt data or impersonate real users.
- **Implementation** Authentication verification is still in very early development, but this should be descriptive of what improper logins should be.

### Failed Logins
- **Risk to address:** Students Cannot Log In or Access Their Course
- **Implementation:** The system should properly display to the user and developers why a login attempt failed, whether it was due to invalid credentials or a problem with the backend.

### Unknown Requests
- **Risk to address:** If someone outside the credential range attempts an API request, such as creating or deleting an annotation.
- **Implementation:** Verify a request to be trackable based on where it came from. 

## Alert Metrics Not Yet in OE Dashboard

### Content Availability
- Number of textbooks viewable/retrievable
- Textbook retrieval failure count
- Textbook load time p95/p99 (95th and 99th percentiles of response times)
- Missing or orphaned textbook content count

### User Activity and Authentication
- Active student and instructor users
- Total sessions by week/month/year
- Successful logins by week/month/year
- Failed logins by week/month/year
- Session failure rate

### Annotation Reliability
- Annotation lookup, creation, deletion, and update failures
- Annotation load time p95/p99
- Total annotations in system
- Annotations attached to invalid or missing content

### Student Feedback / Requests
- Student request submission failures (currently mock)
- Student annotation request count (currently mock)

### Instructor Workload
- Number of content areas (sections/problems) with unresolved student requests
- Instructor annotation creation rate
- Instructor response backlog

### API / System Health
- API error rate
- API response time p95/p99
- Container restart count
- Memory and CPU usage

### Security
- Unauthorized request count
- Rate-limited request count
- Invalid input attempts
- Failed access attempts to restricted course content
- Suspicious high-volume request patterns