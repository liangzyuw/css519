# Operational Metrics – Product OE Dashboard

## Ran by Dashboard Container to Obtain Metrics (example)

{
  "service_up": true,
  "api_requests_per_minute": 42,
  "annotations_total": 12,
  "active_users": 3,
  "errors_last_5_minutes": 0
}

## 1. Service Health Metrics

- `service_up` (boolean)
- `frontend_up` (boolean)
- `backend_uptime_seconds`

---

## 2. API Metrics

- `api_requests_total`
- `api_requests_per_minute`
- `api_success_count`
- `api_error_count`
- `api_error_rate`
- `api_response_time_avg_ms`
- `api_response_time_p95_ms`
- `slow_requests_count`

---

## 3. Error Metrics

- `errors_last_30_minutes`
- `errors_by_type`
- `failed_requests_total`

---

## 4. User Activity Metrics

- `active_users`
- `requests_per_user`
- `sessions_active`
- `annotations_total`

---

## 5. Security Metrics

- `unauthorized_requests_count`
- `rate_limited_requests`

---

## 6. System Resource Metrics

- `cpu_usage_percent`
- `memory_usage_mb`

---

## 7. Deployment Metrics

- `app_version`
- `deployment_timestamp`
- `deployment_success_status`