# Threat Model – CoffeeJelly: Textbook Platform with Educators’ Annotations

## 1. Overview

This document outlines the threat model for the Product educational web application. The system allows instructors to annotate textbook content and students to view those annotations. It should be structured as a classroom-like platform, meant to improve communication with students and instructors amongst each other when interacting with textbook content.

The architecture consists of:
- React frontend (client)
- Node.js/Express backend API
- In-memory datastore (mock, future DB)
- Dockerized deployment

---

## 2. Assets that must be protected

### User Data
- User identities (name, email, role)
- Authentication credentials, such as passwords, addresses, or tokens

### Educational Content
- Textbook content sections and problems other people might want
- Instructor annotations which may contain sensitive teaching material

### System Integrity
- API endpoints
- Backend service availability
- Data consistency

---

## 3. Actors and Parties involved

### Legitimate Users
- Students (read-only access to content + annotations)
- Instructors (create annotations, manage courses)

### Malicious Users (or actors)
- Unauthenticated external attackers
- Authenticated malicious users abusing privileges
- Automated bots (DoS attempts)

---

## 4. Entry Points Possibly Taken Advantage of: 

### API Endpoints
- `POST /annotations`
- `GET /annotations`
- `GET /chapters/{id}/sections`
- `POST /auth/login`, `/users`

### Frontend Inputs
- Annotation text input
- Query parameters in API requests

### 4.3 Network Layer
- HTTP requests between frontend and backend
- Communications made between students or instructors through comments

---

---

## 5. Threat Analysis based on STRIDE

### Spoofing
**Threat:** Impersonating another user  
**Example:** Sending `author_id` manually in POST request  
**Mitigation:**
- Possibly implement authentication (JWT) and Derive user identity from token, not request body

---

### Tampering
**Threat:** Modifying data in transit or requests  
**Example:** Changing `content_id` to attach annotations to unauthorized sections  
**Mitigation:**
- Input validation, Authorization checks, implementing HTTPS in the future

---

### Repudiation
**Threat:** Users deny performing actions  
**Example:** If an instructor denies creating annotation  
**Mitigation:**
- Logging timestamps and user_id, along with audit trails

---

### Information Disclosure
**Threat:** Unauthorized access to data based on user role  
**Example:** Fetching hidden annotations (`on_request`) without permission  
**Mitigation:**
- Enforce visibility rules through role-based access control (RBAC)

---

### Denial of Service (DoS)
**Threat:** Overloading backend with requests  
**Example:** Malicious users spamming `/annotations` endpoint  
**Mitigation:**
- Rate limiting
- Request throttling
- Input size limits

---

### Elevation of Privilege
**Threat:** Gaining higher access rights when not allowed  
**Example:** Student creating instructor level annotations  
**Mitigation:**
- Role validation on certain endpoints
- Middleware-based authorization

---

## 6. Assumptions

- Current system uses no authentication (mock phase)
- Data is stored in memory (non-persistent)
- System runs locally via Docker

---

## 7. Summary of Future Security Enhancements

- JWT-based authentication
- HTTPS enforcement
- Persistent database with access controls
- Input sanitization (prevent XSS)
- Centralized logging & monitoring