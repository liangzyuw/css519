# Operational Runbook for CoffeeJelly: Investigating failed security tests 

This runbook defines how to respond to failed security tests. These might be related to:   
    - Authentication  
    - Improper access control  
    - Unauthorized API requests (POST, GET, DELETE, etc.)  

---

## Common Authentication Failure Types

### 1. Authentication Failures (Expected 401)
* Invalid email/password returns 200 instead of 401, or Missing token still allows access

### 2. Authorization Failures (Expected 403)
Examples:
* Student user can POST to `/annotations`
* Instructors can't POST to `/annotations`
* Instructors can post to `/annotations` outside their courses
* Role restrictions not properly enforced

### 3. Token Issues
Examples:
* Invalid or expired JWT still accepted
* Token missing required fields (e.g., `role`)

---

## Failures may be detected via:
* Manual testing (Postman)
* Automated test scripts (`/test_scripts`)
    * security_tests.sh
    * functional_tests.sh
* Logs showing unexpected status codes, through browser console or IDE.

---

## Investigation Steps

1. **Reproduce the issue**
* Run the failing request manually (can be done with Postman or curl) and confirm the incorrect status code or behavior

2. **Check request details**
* Is the Authorization header present?
* Is the token valid and correctly formatted?
    * NOTE: The test scripts can show you login tokens

3. **Inspect backend logs**
* Look for errors in middleware 
    * role checks in `auth.js`
    * Confirm whether `req.user` is populated

4. **Verify JWT handling**
* Ensure `jsonwebtoken.verify()` is working
* Confirm correct secret is used

5. **Check middleware order**
* Must follow this order:
     ```
     authMiddleware → roleCheck → route handler
     ```

6. **Validate role logic**
* Confirm `req.user.role` is correct
* Ensure students are explicitly blocked from POST requests to API endpoints they should've be allowed to:
    * Students should be allowed to leave comments still.

---

## Mitigation
The usual areas that might be related to issues regarding test cases are in the routes, middleware, and token handling.  

Depending on root cause:   
* Fix middleware logic (auth or role check)
* Ensure JWT includes required fields (`id`, `role`)
* Correct route protection (apply middleware to all protected routes)
* Reject malformed or missing tokens

---

## Recovery

1. Apply fix in implementation
2. Restart backend service
3. Re-run all security tests  
These should be expected at the very least:   
   * Invalid login → 401
   * No token → 401
   * Student POST → 403
   * Instructor POST → 200

4. Check for any changes in output compared to previous results

---

## Logging and Monitoring
Add logs where needed:

```js
console.log("User:", req.user);
console.log("Auth header:", req.headers.authorization);
```

Future improvements:
* Structured logging (e.g., request IDs)
* Alerting on repeated auth failures

---

## Possible Prevention

* Add automated tests (Jest / CI pipeline)
* Enforce middleware usage across all routes
* Use environment variables for secrets
* Periodically review role-based access logic

---

## Known Good Behavior (Baseline)

| Scenario        | Expected Status |
| --------------- | --------------- |
| Invalid login   | 401             |
| Missing token   | 401             |
| Student POST    | 403             |
| Instructor POST | 200             |

---
