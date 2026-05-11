# Highest Risks to Customer Use of Product

## 1. Overview

This document identifies the highest risks that could disrupt customer use of **CoffeeJelly**. 

In an increasingly **AI Native** world, educational software products may incorporate automation, recommendation systems, AI-generated summaries, and intelligent prioritization. However, this also increases the need for careful human judgment. CoffeeJelly is intended to support instructors and students, not replace the professional expertise of educators. The highest risks are not only technical failures, but also failures that reduce trust, instructional quality, usability, or the ability of Instructors to make informed decisions.

---

## 2. Risk Summary

The most serious risks to customer use:

- Textbook content fails to load or loads too slowly (< 3 seconds)
- Instructor annotations fail to appear, appear late, or appear in the wrong location
- Students are unable to request clarification or leave suggestions.
- Instructors receive too many scattered student requests and can't prioritize them effectively or address all of them
- Authentication or access control prevents legitimate users from accessing course content.
- System performance degrades during high-usage periods.
- Bonus: AI-assisted features provide inaccurate or poorly prioritized recommendations.

--- 

## 3. Student-Side Risks

### 3.1 Textbook Content Does Not Load

#### Description and Customer Impact
Students depend on the platform to access textbook sections, homework questions, and related learning material. If textbook content does not load, loads partially, or takes too long to appear, students may be unable to complete assigned work.

This is one of the highest disruption risks because the textbook viewer is the core student-facing feature. If content is unavailable, the platform cannot serve its main educational purpose.

#### Example Failure Scenarios
- The backend content API is unavailable.
- The frontend fails to render textbook sections.
- The system returns the wrong chapter or section.
- Network latency causes long loading times.
- Docker container or API service fails.

#### Impact Level
**High**

#### Mitigation Strategies
- Add service health checks.
- Monitor textbook API response times.
- Display useful loading and error states.
- Cache commonly accessed textbook content.
- Add automated tests for content retrieval.
- Add fallback messaging when textbook content cannot be loaded.

---

### 3.2 Annotations Do Not Appear or Load Too Slowly

#### Description and Customer Impact
Instructor annotations are one of the main value propositions of Product. If annotations do not appear next to the correct content, students lose access to the instructor’s guidance.  

Students may misunderstand textbook material, miss important hints, or assume no instructor support exists. This directly reduces the educational value of the platform.

#### Example Failure Scenarios
- Annotation API fails.
- Annotation query uses the wrong `content_id` or `content_type`.
- Annotation markers display but return no data.
- Annotations load too slowly after a student clicks a marker.
- The annotation panel shows stale or incorrect content.

#### Impact Level

**High**

#### Mitigation Strategies

- Add monitoring for annotation API failures.
- Track annotation load time.
- Validate annotation-to-content relationships.
- Show clear empty states such as “No instructor annotation has been added yet.”
- Include logging for failed annotation lookups.

---

### 3.3 Students Cannot Leave Annotation Requests or Suggestions

#### Description and Customer Impact

A future feature of Product allows students to request clarification or leave suggestions near confusing textbook content. If this feature fails, students lose an important feedback channel.

Students may be unable to communicate where they are confused. This reduces instructor visibility into student learning needs and weakens the feedback loop between students and Instructors.

#### Example Failure Scenarios

- Suggestions (annotation requests) take too many steps
- Student request form fails to submit.
- Requests are attached to the wrong textbook section or problem.
- Students receive no confirmation that their request was submitted.
- The system does not preserve requests after restart or failure.

#### Impact Level

**Medium to High**

#### Mitigation Strategies

- Confirm successful request submission in the UI.
- Store requests persistently.
- Add validation for request location and content.
- Track request submission success and failure rates.
- Provide students with a history of their submitted requests.

---

### 3.4 Students Cannot Log In or Access Their Course

#### Description and Customer Impact

If authentication fails or course access is misconfigured, students may be blocked from using the product entirely.

A login or access failure prevents all downstream learning activity. Even if textbook and annotation services work correctly, students cannot benefit from them if they cannot enter the system.

#### Example Failure Scenarios

- Valid credentials are rejected.
- Login token is not stored correctly.
- The frontend incorrectly redirects users back to the login page.
- Enrollment data is missing or incorrect.

#### Impact Level

**High**

#### Mitigation Strategies

- Add login error handling.
- Monitor failed login attempts.
- Implement clear access-denied messages.
- Add role and enrollment validation.

---

## 4. Instructor-Side Risks

### 4.1 Too Many Student Requests Across Many Textbook Areas

#### Description

If many students leave clarification requests throughout different textbook sections, Instructors may have difficulty identifying which areas need attention most urgently.

The Instructor may become overwhelmed and unable to prioritize where to add annotations. This could reduce the usefulness of the platform and make it feel like extra work rather than instructional support.

#### Example Failure Scenarios

- Requests are displayed as a long unorganized list.
- The system does not group requests by textbook section.
- High-priority issues are not surfaced.
- Duplicate requests from multiple students are not combined.
- Instructors cannot tell whether many students are confused about the same concept.

#### Impact Level

**High**

#### Mitigation Strategies

- Group student requests by course, chapter, section, and problem.
- Show request counts per textbook area.
- Highlight sections with unusually high request volume.
- Allow instructors to filter by unresolved requests.
- Allow instructors to mark requests as reviewed or resolved.
- Provide summary views rather than forcing Instructors to inspect every individual request.

---

### 4.2 Teachers Cannot Create or Manage Annotations Efficiently

#### Description and Customer Impact

Teachers need a fast, low-friction way to add annotations to textbook content. If creating annotations is difficult, slow, or confusing, instructors may not use the platform consistently.  

The platform depends on instructor participation. If teachers find annotation creation burdensome, students will receive fewer useful explanations.

#### Example Failure Scenarios

- Annotation creation requires too many steps.
- Teachers cannot attach annotations to precise content locations.
- Annotation editor fails to save.
- Teachers cannot edit or delete outdated annotations.
- Teachers cannot preview how annotations appear to students.

#### Impact Level

**High**

#### Mitigation Strategies

- Provide an inline annotation editor.
- Allow annotations to be attached directly to sections, problems, or selected text.
- Provide teacher preview mode (to see what students see).

---

## 5. Operational Risks

### 5.1 Backend API Failure

#### Description

The backend API provides textbook content, annotations, authentication, and future request data. If it fails, the frontend cannot function properly.

#### Impact Level

**High**

#### Mitigation Strategies

- Add backend health checks.
- Track `service_up`.
- Monitor API error count.
- Add container restart policies.
- Provide clear frontend error messages.

---

### 5.2 Dashboard or Metrics Failure

#### Description

The operational excellence dashboard helps maintainers understand the state of the Product. If the dashboard fails, the product may still function, but maintainers lose visibility into system health.

#### Impact Level

**High**

#### Mitigation Strategies

- Monitor dashboard availability.
- Ensure metrics API returns expected values.
- Add alerts for service failures in future versions.
- Keep critical product functionality independent from the dashboard.

---

### 6.3 Slow System Performance

#### Description

Even if the system is technically available, slow response times can significantly disrupt use. Students may abandon the platform if textbook content or annotations are delayed.

#### Impact Level

**Medium**

#### Mitigation Strategies

- Track API response times.
- Optimize annotation queries.
- Cache common textbook content or annotations
- Avoid loading unnecessary data on initial page load.

---

## 7. Highest Priority Risks

The following risks should receive the highest priority in early development:

| Priority | Risk | Reason |
|---|---|---|
| 1 | Textbook content fails to load | Blocks core student use |
| 2 | Annotations fail to appear correctly | Breaks main product value |
| 3 | Students cannot log in or access courses | Prevents all use |
| 4 | Teachers are overwhelmed by student requests | Reduces instructor adoption |
| 5 | Teachers cannot efficiently create annotations | Limits educational usefulness |
| 6 | Poor performance during class usage | Damages trust and usability |

---

## 8. Recommended Early Metrics

To identify customer disruption early, CoffeeJelly should track the following metrics:

```text
service_up
frontend_up
api_requests_total
api_success_count
api_error_count
api_error_rate
textbook_load_time_ms
annotation_load_time_ms
annotation_lookup_failures
student_request_submission_failures
active_users
annotations_total
student_requests_total
unauthorized_requests_count
app_version
```