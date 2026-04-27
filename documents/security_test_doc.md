# Security Test Documentation – CoffeeJelly: Textbook Platform with Educators’ Annotations

## 1. Overview

Defines initial security test cases for the web application focusing on API security, input validation, and basic attack vectors.

---

## 2. Test Scope

#### In Scope
- Backend REST API
- Annotation system
- Input handling
- Authorization logic (mocked)

#### Out of Scope (current phase)
- Full authentication system
- Production infrastructure

---

## 3. Test Categories

### 3.1 API Security Tests

#### Test Case: Unauthorized annotation creation
- **Endpoint:** POST /annotations
- **Description:** Ensure unauthenticated users cannot create annotations
- **Steps:**
  1. Send POST request without auth token
- **Expected Result:**
  - Request should be rejected (future)
- **Current Status:** currently not implemented

#### Test Case: Unauthorized deletion of content
- **Endpoint:** DELETE /annotations/{annotation_id}
- **Description:** Ensure student or instructors outside the course cannot delete annotations
- **Steps:**
  1. Attempt to send DELETE request without authentication
  2. Attempt to send DELETE request as a different authenticated user (not the author)
  3. Attempt to send DELETE request as a student not enrolled in the course
- **Expected Result:**
  - Unauthenticated request rejected (401 Unauthorized)
  - Unauthorized user rejected (403 Forbidden)
  - Only valid authorized user -> deletion succeeds (200 or 204)
- **Current Status:** currently not implemented, (no DELETE endpoint and no authentication/authorization logic)

#### Test Case: Parameter tampering
- **Description:** Modify `content_id` and `content_type`
- **Steps:**
  1. Send POST request with invalid IDs
- **Expected Result:**
  - Server validates and rejects invalid references
  - Likely high risk  

#### Test Case: Assignment of excess data
- **Description:** Inject extra fields in request body
- **Payload Example:**
```json
{
  "content_id": "sec1",
  "admin": true
}
```
- **Expected Result:**
  - Extra fields ignored or rejected

--- 

### 3.2 Input Validation

#### Test Case: XSS Injection
- **Field**: annotation body
- **Payload**: `<script>alert('XSS')</script>`

- **Expected Result**:
Script is escaped or sanitized.  

#### Test Case: Large Payload
- **Description**: Send very large annotation body
- **Expected Result**: Request rejected or limited.  

--- 

### 3.3 Access Control Tests

#### Test Case: Role Bypass
- **Description**: Student attempts instructor action.  
- **Steps**:
  Send POST /annotations with student role  
- **Expected Result**:
  Access should be denied.  

#### Test Case: Hidden Annotation Access
- **Endpoint**: GET /annotations/request
- **Description**: Access restricted annotations
- **Expected Result**:
Only authorized users receive data

### 3.4 DoS / Abuse Tests
#### Test Case: Request Flooding
- **Description**: Rapid repeated API calls
- **Expected Result**:
Rate limiting triggered.  

### 3.5 Data Integrity Tests
#### Test Case: Invalid Relationships
- **Description**: Annotation references non-existent section
- **Expected Result**: Request rejected  

---

## 4. Tools used during development and testing
- Postman (API testing)
- Browser DevTools (network inspection)
- curl (manual testing)

--- 

## 5. Current Known Gaps and Future Development
- Authentication/authorization needs to be implemented soon
- Implement role-based access control
- Needs rate limiting of requests
- Validate all inputs
- Sanitize user-generated content
- Needs persistent storage
- Possible logging functionality