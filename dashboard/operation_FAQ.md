# Operational Questions – Product OE Dashboard

## 1. System Health

- Is the backend service currently running and able to provide data from the database?
- Is the frontend accessible?
- Are all Docker containers up and healthy?

---

## 2. Availability, Traffic, and Performance

- What is the current uptime of the backend service?
- Are any endpoints failing?
- What is the API success vs failure rate, along with average API response time?
- What is the request latency trend?
- How many active users are currently using the system?
- How many requests per minute is the backend receiving?

---

## 3. Annotations

- How many total annotations have been created?
- Which textbooks have the most annotations?

---

## 4. Errors and Failure Rate

- What types of errors are most common?
- Are there any spikes in failed requests?

---

## 5. Security Monitoring

- Are there suspicious request patterns (repeated POST requests)?
- Are there unauthorized access attempts?

---

## 6. System Resources if applicable

- What is the CPU usage of the backend container?
- What is the memory usage?
- Are there resource bottlenecks?

---

## 7. Deployment Status

- What version of the application is currently running?
- When was the last deployment?
- Any recent failures during deployment?