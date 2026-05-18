# Operational Metrics – Product OE Dashboard

## Ran by Dashboard Container to Obtain Metrics (example)

{
  "service_up": true,
  "api_requests_per_minute": 42,
  "annotations_total": 12,
  "textbooks_total": 2,
  "active_users": 3,
  "errors_last_5_minutes": 0
}

## 1. Service Health Metrics

- `service_up` (boolean)
- `frontend_up` (boolean)
- `backend_up` (boolean)
- `backend_uptime_seconds`(not implemented)

service_up   = overall product status.  
frontend_up  = textbook UI reachable.  
backend_up   = API reachable.  

---

## 2. API Metrics

- `api_requests_total`
- `api_requests_per_minute` (not implemented)
- `api_success_count`
- `api_error_count`
- `api_error_rate` (not implemented)
- `api_response_time_avg_ms` (not implemented)
- `api_response_time_p95_ms` (not implemented)
- `slow_requests_count` (not implemented)

---

## 3. User Experience Latency 

- `textbook_load_time`
- `annotation_load_time`

---

## 4. User Activity Metrics

- `active_users`
- `textbooks_total`
- `requests_per_user` (not implemented)
- `annotations_total`

---

## 5. Security Metrics

- `unauthorized_requests_count` 
- `failed_login_count`
- `unknown_requests` (not implemented)
- `rate_limited_requests` (not implemented)

---

## 6. System Resource Metrics

- `cpu_usage_percent` (not implemented)
- `memory_usage_mb` (not implemented)

---

# 7. Weekly Login Successes
- `Successful Student Logins`
- `Successful Instructor Logins`

--- 

## 8. Weekly Failure Trends (Graph)
- `Annotation Lookup Failures` (not implemented)
- `Student Request Submission Failures` (not implemented)

--- 

## 9. Error Metrics (not implemented)

- `errors_last_30_minutes`
- `errors_by_type`
- `failed_requests_total`

---

## 10. Deployment Metrics

- `app_version`
- `deployment_timestamp` (not implemented)
- `deployment_success_status` (not implemented)