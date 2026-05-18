# OE Dashboard Coverage Compared to Business Impact / Continuity Analysis

This document compares what the OE dashboard can currently answer against the major risks identified in the business impact and continuity analysis. In other words, the goal is to show where the dashboard already supports operational monitoring and where important business risks are still not fully covered.

---

## 1. Textbook Content Fails to Load or Loads Too Slowly

Business impact concerns: 

- Students may be unable to access textbook sections, homework questions, or course material.

On the Dashboard, check:

- Whether the overall service is up.
- Whether the frontend and backend are reachable.
- Basic textbook load time through `textbook_load_time`.
- Total number of textbooks through `textbooks_total`.

Remaining gaps:

- No p95 textbook load time.
- No textbook load failure count.
- No metric showing wrong, missing, or partially loaded textbook content.

---

## 2. Instructor Annotations Fail

Business impact concern:

- Students may miss instructor guidance, hints, or explanations.
- Incorrect or slow annotations reduce the educational value of the product.

On the Dashboard, check:

- Total annotations through `annotations_total`.
- Annotation loading time through `annotation_load_time`.
- API success and error counts.

Remaining gaps:

- `Annotation Lookup Failures` is not implemented.
- No stale or incorrect annotation detection.

---

## 3. Students Cannot Leave Annotation Requests or Suggestions

Business impact concern:

- Students lose a feedback channel for confusing content.
- Instructors lose visibility into where students need help.

On the Dashboard, check:

- Basic API success and error counts may indirectly show request problems.
- User activity can be estimated through `active_users`.

Remaining gaps:

- Request functionality still in development.

---

## 4. Students Cannot Log In or Access Their Course

Business impact concern:

- Students may be blocked from using the platform entirely.
- Login failures prevent all downstream textbook and annotation activity.

On the Dashboard, check:

- Failed login count through `failed_login_count`.
- Unauthorized request count through `unauthorized_requests_count`.
- Weekly successful student and instructor logins.

---

## 5. Instructors Receive Too Many Scattered Student Requests

Business impact concern:

- Instructors may not know which textbook areas need attention most.
- Student requests may become difficult to prioritized
- This is not directly covered by the current dashboard.

Remaining gaps:

- No duplicate request grouping.
- No unresolved or reviewed request tracking.

---

## 6. Backend API Failure

Business impact concern:

- If the backend API fails, the frontend cannot provide textbook content, annotations, authentication, or request workflows.

On the Dashboard, check:

- Whether the backend is up through `backend_up`.
- Whether the overall service is up through `service_up`.
- Total API requests, successes, and errors.

Remaining gaps:

- `api_error_rate` is not implemented.
- API response time averages and p95 metrics are not implemented.
- `errors_last_30_minutes`, `errors_by_type`, and `failed_requests_total` are not implemented.

---

## 7. System Performance Degrades During High Usage

Business impact concern:

- Students and instructors may experience slow loads, failed actions, or poor responsiveness during busy periods.

On the Dashboard, check:

- Some latency visibility through textbook and annotation load time.
- Some activity visibility through active users and total API requests.

Remaining gaps:

- `api_requests_per_minute` is not implemented.
- CPU and memory metrics are not implemented.
- No requests-per-user metric.
- No slow request count.

---

## Summary

The strongest current coverage is for basic service health and login visibility. Next coverage should be for student request workflows, instructor prioritization, annotation correctness, and system resource pressure. To better align the dashboard with the business continuity analysis, there should additionally be:
 - request failure tracking
 - annotation lookup failure tracking
 - API latency metrics
 - resource monitoring. 