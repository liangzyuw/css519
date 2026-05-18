# Updated Operational Questions for OE Dashboard - May 17, 2026

## 1. System Health - Availability, Traffic, and Performance

- Is the overall service running?
- Is the frontend textbook UI reachable?
- Is the backend API reachable?
- Has the backend been running continuously, or was there a recent restart?

Current supporting metrics:

- `service_up`
- `frontend_up`
- `backend_up`

Remaining gaps:

- `backend_uptime_seconds` is not implemented, so the dashboard cannot clearly show whether the backend recently restarted.
- There is no deployment or container restart history yet.

---

## 2. Textbooks and Annotations

- How long does textbook content take to load?
- How long do annotations take to load?
- Are annotation lookups failing?
- Are students seeing the instructor support content they expect?

Current supporting metrics:

- `textbook_load_time`
- `annotation_load_time`
- `annotations_total`
- `textbooks_total`

Remaining gaps:

- Annotation lookup failures are not implemented.
- There is no p95 latency metric for textbook or annotation loading.
- There is no metric showing whether annotations are attached to the correct textbook location.

The dashboard can partially monitor loading time, but it still cannot fully confirm annotation correctness or failure trends.

---

## 3. Errors and Failure Rate

- How many API requests are being made?
- Is the error rate increasing?
- Are users experiencing slow responses?

Current supporting metrics:

- `api_requests_total`
- `api_success_count`
- `api_error_count`

Remaining gaps:

- `api_requests_per_minute` is not implemented.
- Average and p95 response time metrics are not implemented.
- `slow_requests_count` is not implemented.

Because of these gaps, the dashboard can show basic success and failure counts, but it needs to also show traffic trends, latency issues, or whether performance is degrading over time.

---

## 7. Authentication

- Are students successfully logging in during the week?
- Are instructors successfully logging in during the week?
- Are failed login attempts increasing?
- Are unauthorized requests occurring?
- Are users or clients being rate limited?

Current supporting metrics:

- `active_users`
- `failed_login_count`
- `student_logins_week`
- `instructor_logins_week`

Remaining gaps:

- Login counts need to be persisted so previous days of the week are not reset.
- `requests_per_user` is not implemented.
- `unknown_requests` is not implemented.
- `rate_limited_requests` is not implemented.
- There is no breakdown of active users by role.

The weekly login graph is useful, but it depends on persistent storage to become operational.

---

## 6. System Resources if applicable

Remaining gaps:

- `cpu_usage_percent` is not implemented.
- `memory_usage_mb` is not implemented.

- Is CPU usage high?
- Is memory usage high?
- Could resource pressure explain slow requests or outages?

Without system resource metrics, the dashboard cannot easily connect service failures or latency spikes to container or host resource limits.

---

## 7. Did the latest deployment succeed?

The dashboard should answer:

- What version of the app is currently running?
- When was it deployed?
- Did the deployment succeed?

Current supporting metrics:

- `app_version`