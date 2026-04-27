# Unknown Risks & Future Security Considerations

This document tracks potential risks that are not fully understood or tested yet, also called "unknown unknowns".   
This includes:
* dependencies
* edge cases 
* unimplemented safeguards.

---

## Potential Risk Areas

### 1. Dependency Risks

* Vulnerabilities in npm packages
    * `jsonwebtoken` - tokens are stateless and self-contained, stolen tokens remain valid until they expire, posing significant security risks
    * `express` - requiring the selection of middleware
    * `cors` - security mechanism built into browsers for added security
    * `sqlite3` - poor performance with high write volumes, limited concurrency
* Breaking changes in future package updates

Mitigation:

* Run `npm audit`
* Use dependency scanning tools
    * GitHub Dependabot
* Possible dependency injection?

---

### 2. Token Security

Unknowns:

* Token expiration not fully tested
* No refresh token mechanism
* Tokens stored in `localStorage` (XSS risk in production)

Future tests:

* Expired token -> should return 401
* Tampered token -> should fail verification

---

### 3. Role Escalation
Can a user forge a token with `"role": "instructor"`?

Future tests:

* Modify JWT payload manually -> should be rejected
* Use wrong secret -> should fail

---

### 4. Middleware Protection

Some routes may not be protected.

Future tests:

* Attempt access to all endpoints without token
* Ensure consistent 401 responses

---

### 5. Input Validation (input not implemented yet) and Rate Limiting

Risks: 
* No validation on annotation input fields
* No protection against brute force login attempts
* Injection attacks (future DB usage)
* Malformed data

Future tests:

* Send empty or malformed payloads
* Send excessively large input
* Add rate limiting middleware
* Test repeated login failures

--- 

## Additional Test Cases for the Future

### Authentication

* Expired JWT → 401
* Missing "Bearer" prefix → 401

### Input / API

* Invalid JSON body → 400
* Missing required fields → 400